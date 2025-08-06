// @ts-strict-ignore
import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, hidden, renders, focusable, disabled, defaults, reflects } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { GlobalTestProps, dragAndDrop, findAll } from "../../tests/utils/puppeteer";
import { DEBOUNCE } from "../../utils/resources";
import { Reorder } from "../sort-handle/interfaces";
import { SLOTS as BLOCK_SLOTS } from "../block/resources";
import { Block } from "../block/block";
import { mockConsole } from "../../tests/utils/logging";
import { IDS } from "../sort-handle/resources";
import { BlockDragDetail } from "./interfaces";
import type { BlockGroup } from "./block-group";

const blockHTML = html`<calcite-block heading="heading" description="description" open collapsible>
  <div slot=${BLOCK_SLOTS.icon}>✅</div>
  <div>content</div>
  <label slot=${BLOCK_SLOTS.control}>test <input placeholder="control" /></label>
</calcite-block>`;

describe("calcite-block-group", () => {
  mockConsole();

  describe("defaults", () => {
    defaults("calcite-block-group", [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
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
        propertyName: "sortDisabled",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-block-group", [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
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
    ]);
  });

  describe("renders", () => {
    renders("calcite-block-group", { display: "block" });
  });

  describe("is focusable", () => {
    focusable(html`<calcite-block-group> ${blockHTML} </calcite-block-group>`, {
      focusTargetSelector: "calcite-block",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-block-group");
  });

  describe("accessible", () => {
    accessible(html`<calcite-block-group> ${blockHTML} </calcite-block-group>`);
  });

  describe("disabled", () => {
    disabled(html`<calcite-block-group> ${blockHTML} </calcite-block-group>`, { focusTarget: "child" });
  });

  it("should set the dragHandle property on items", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block-group id="root" drag-enabled group="my-block-group">
        <calcite-block id="one" heading="one" label="One"></calcite-block>
        <calcite-block id="two" heading="two" label="Two"></calcite-block>
        <calcite-block id="three" heading="three" label="Three"></calcite-block>
      </calcite-block-group>`,
    );

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.nextTick);

    const items = await findAll(page, "calcite-block");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(true);
    }

    const blockGroup = await page.find("#root");

    blockGroup.setProperty("dragEnabled", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.nextTick);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(false);
    }
  });

  it("should set the sortDisabled property on items", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block-group id="root" drag-enabled sort-disabled group="my-block-group">
        <calcite-block id="one" heading="one" label="One"></calcite-block>
        <calcite-block id="two" heading="two" label="Two"></calcite-block>
        <calcite-block id="three" heading="three" label="Three"></calcite-block>
      </calcite-block-group>`,
    );

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.nextTick);

    const items = await findAll(page, "calcite-block");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("sortDisabled")).toBe(true);
    }

    const blockGroup = await page.find("#root");

    blockGroup.setProperty("sortDisabled", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.nextTick);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("sortDisabled")).toBe(false);
    }
  });

  describe("drag and drop", () => {
    async function createSimpleBlockGroup(): Promise<E2EPage> {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-block-group drag-enabled id="component1">
          <calcite-block id="one" heading="one" label="One"></calcite-block>
          <calcite-block id="two" heading="two" label="Two"></calcite-block>
          <calcite-block id="three" heading="three" label="Three"></calcite-block>
        </calcite-block-group>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.nextTick);
      return page;
    }

    type TestWindow = GlobalTestProps<{
      calledTimes: number;
      component1CalledTimes: number;
      component2CalledTimes: number;
      newIndex: number;
      oldIndex: number;
      fromEl: string;
      toEl: string;
      el: string;
      startCalledTimes: number;
      endCalledTimes: number;
      endNewIndex: number;
      endOldIndex: number;
      startNewIndex: number;
      startOldIndex: number;
    }>;

    it("works using a mouse", async () => {
      const page = await createSimpleBlockGroup();

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("calcite-block-group", (blockGroup: BlockGroup["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        testWindow.newIndex = -1;
        testWindow.oldIndex = -1;
        testWindow.startCalledTimes = 0;
        testWindow.endCalledTimes = 0;
        blockGroup.addEventListener("calciteBlockGroupOrderChange", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.calledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
        });
        blockGroup.addEventListener("calciteBlockGroupDragEnd", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.endCalledTimes++;
          testWindow.endNewIndex = event.detail.newIndex;
          testWindow.endOldIndex = event.detail.oldIndex;
        });
        blockGroup.addEventListener("calciteBlockGroupDragStart", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.startCalledTimes++;
          testWindow.startNewIndex = event.detail.newIndex;
          testWindow.startOldIndex = event.detail.oldIndex;
        });
      });

      await dragAndDrop(
        page,
        {
          element: `calcite-block[heading="one"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `calcite-block[heading="two"]`,
          shadow: "calcite-sort-handle",
        },
      );

      const [first, second] = await findAll(page, "calcite-block");
      expect(await first.getProperty("heading")).toBe("two");
      expect(await second.getProperty("heading")).toBe("one");
      await page.waitForChanges();

      const results = await page.evaluate(() => {
        const testWindow = window as TestWindow;

        return {
          calledTimes: testWindow.calledTimes,
          oldIndex: testWindow.oldIndex,
          newIndex: testWindow.newIndex,
          endCalledTimes: testWindow.endCalledTimes,
          startCalledTimes: testWindow.startCalledTimes,
          endNewIndex: testWindow.endNewIndex,
          endOldIndex: testWindow.endOldIndex,
          startNewIndex: testWindow.startNewIndex,
          startOldIndex: testWindow.startOldIndex,
        };
      });

      expect(results.calledTimes).toBe(1);
      expect(results.startCalledTimes).toBe(1);
      expect(results.endCalledTimes).toBe(1);
      expect(results.oldIndex).toBe(0);
      expect(results.newIndex).toBe(1);
      expect(results.startNewIndex).toBe(null);
      expect(results.startOldIndex).toBe(0);
      expect(results.endNewIndex).toBe(1);
      expect(results.endOldIndex).toBe(0);
    });

    it("supports dragging items between block groups", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-block-group id="first-letters" drag-enabled group="letters">
          <calcite-block heading="a" label="A"></calcite-block>
          <calcite-block heading="b" label="B"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="numbers" drag-enabled group="numbers">
          <calcite-block heading="1" label="One"></calcite-block>
          <calcite-block heading="2" label="Two"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="no-group" drag-enabled>
          <calcite-block heading="no-group" label="No group"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="second-letters" drag-enabled group="letters">
          <calcite-block heading="c" label="C"></calcite-block>
          <calcite-block heading="d" label="D"></calcite-block>
          <calcite-block heading="e" label="E"></calcite-block>
          <calcite-block heading="f" label="F"></calcite-block>
        </calcite-block-group>
      `);

      await page.waitForChanges();

      const letterBlockSelector = `calcite-block-group[group="letters"] calcite-block`;
      const letterBlocks = await findAll(page, letterBlockSelector);

      expect(letterBlocks.length).toBe(6);

      const moveToItemIds = await page.evaluate((letterBlockSelector) => {
        return Array.from(document.querySelectorAll(letterBlockSelector))
          .map((item: Block["el"]) => item.moveToItems.map((moveToItem) => moveToItem.id))
          .flat();
      }, letterBlockSelector);

      expect(moveToItemIds.length).toBe(6);

      const uniqueMoveToItemIds = new Set(moveToItemIds);

      expect(uniqueMoveToItemIds.size).toBe(2);

      const moveToItemElementIds = await page.evaluate((letterBlockSelector) => {
        return Array.from(document.querySelectorAll(letterBlockSelector))
          .map((item: Block["el"]) => item.moveToItems.map((moveToItem) => moveToItem.element.id))
          .flat();
      }, letterBlockSelector);

      expect(moveToItemElementIds.length).toBe(6);
      expect(moveToItemElementIds[0]).toBe("second-letters");
      expect(moveToItemElementIds[1]).toBe("second-letters");

      expect(moveToItemElementIds[2]).toBe("first-letters");
      expect(moveToItemElementIds[3]).toBe("first-letters");
      expect(moveToItemElementIds[4]).toBe("first-letters");
      expect(moveToItemElementIds[5]).toBe("first-letters");

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.evaluate(() => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        const blockGroups = document.querySelectorAll("calcite-block-group");
        blockGroups.forEach((blockGroup) =>
          blockGroup.addEventListener("calciteBlockGroupOrderChange", () => {
            testWindow.calledTimes++;
          }),
        );
      });

      await dragAndDrop(
        page,
        {
          element: `calcite-block[heading="d"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `#first-letters`,
          pointerPosition: {
            vertical: "bottom",
          },
        },
      );

      await dragAndDrop(
        page,
        {
          element: `calcite-block[heading="e"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `#numbers`,
          pointerPosition: {
            vertical: "bottom",
          },
        },
      );

      await dragAndDrop(
        page,
        {
          element: `calcite-block[heading="e"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `#no-group`,
          pointerPosition: {
            vertical: "bottom",
          },
        },
      );

      const [first, second, third, fourth, fifth, sixth, seventh, eight, ninth] = await findAll(page, "calcite-block");
      expect(await first.getProperty("heading")).toBe("a");
      expect(await second.getProperty("heading")).toBe("b");
      expect(await third.getProperty("heading")).toBe("d");
      expect(await fourth.getProperty("heading")).toBe("1");
      expect(await fifth.getProperty("heading")).toBe("2");
      expect(await sixth.getProperty("heading")).toBe("no-group");
      expect(await seventh.getProperty("heading")).toBe("c");
      expect(await eight.getProperty("heading")).toBe("e");
      expect(await ninth.getProperty("heading")).toBe("f");

      expect(await page.evaluate(() => (window as TestWindow).calledTimes)).toBe(2);
    });

    it("calls canPull and canPut for move items", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-block-group label="First Letters" id="first-letters" drag-enabled group="letters">
          <calcite-block id="a" heading="a" label="A"></calcite-block>
          <calcite-block id="b" heading="b" label="B"></calcite-block>
        </calcite-block-group>
        <calcite-block-group label="Second Letters" id="second-letters" drag-enabled group="letters">
          <calcite-block id="c" heading="c" label="C"></calcite-block>
          <calcite-block id="d" heading="d" label="D"></calcite-block>
        </calcite-block-group>
      `);

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.evaluate(() => {
        const firstLetters = document.getElementById("first-letters") as BlockGroup["el"];
        firstLetters.canPull = ({ dragEl }) => dragEl.id === "b";
        firstLetters.canPut = ({ dragEl }) => dragEl.id === "c";
      });
      await page.waitForChanges();

      async function getMoveItems(id: string) {
        const component = await page.find(`#${id}`);
        component.setProperty("sortHandleOpen", true);
        await page.waitForChanges();

        return await findAll(page, `#${id} >>> calcite-dropdown-group#${IDS.move} calcite-dropdown-item`, {
          allowEmpty: true,
        });
      }

      const aMoveItems = await getMoveItems("a");
      expect(aMoveItems.length).toBe(0);

      const bMoveItems = await getMoveItems("b");
      expect(bMoveItems.length).toBe(1);
      expect(await bMoveItems[0].getProperty("label")).toBe("Second Letters");

      const cMoveItems = await getMoveItems("c");
      expect(cMoveItems.length).toBe(1);
      expect(await cMoveItems[0].getProperty("label")).toBe("First Letters");

      const dMoveItems = await getMoveItems("d");
      expect(dMoveItems.length).toBe(0);
    });

    it("reorders using a keyboard", async () => {
      const page = await createSimpleBlockGroup();

      let totalMoves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("calcite-block-group", (blockGroup: BlockGroup["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        blockGroup.addEventListener("calciteBlockGroupOrderChange", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.calledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
          testWindow.fromEl = event.detail.fromEl.id;
          testWindow.toEl = event.detail.toEl.id;
          testWindow.el = event.detail.dragEl.id;
        });
      });

      async function assertReorder(
        reorder: Reorder,
        expectedOrder: string[],
        newIndex: number,
        oldIndex: number,
      ): Promise<void> {
        const component = await page.find("calcite-block-group");
        const eventName = `calciteSortHandleReorder`;
        const eventSpy = await component.spyOnEvent(eventName);
        await page.$eval(
          `calcite-block[heading="one"]`,
          (item1: Block["el"], reorder, eventName) => {
            item1.dispatchEvent(new CustomEvent(eventName, { detail: { reorder }, bubbles: true, cancelable: true }));
          },
          reorder,
          eventName,
        );
        await page.waitForChanges();
        await eventSpy.next();
        const itemsAfter = await findAll(page, "calcite-block");
        expect(itemsAfter.length).toBe(3);

        for (let i = 0; i < itemsAfter.length; i++) {
          expect(await itemsAfter[i].getProperty("heading")).toBe(expectedOrder[i]);
        }

        const results = await page.evaluate(() => {
          const testWindow = window as TestWindow;

          return {
            calledTimes: testWindow.calledTimes,
            oldIndex: testWindow.oldIndex,
            newIndex: testWindow.newIndex,
            fromEl: testWindow.fromEl,
            toEl: testWindow.toEl,
            el: testWindow.el,
          };
        });

        const id = "component1";

        expect(results.calledTimes).toBe(++totalMoves);
        expect(results.newIndex).toBe(newIndex);
        expect(results.oldIndex).toBe(oldIndex);
        expect(results.fromEl).toBe(id);
        expect(results.toEl).toBe(id);
        expect(results.el).toBe("one");
      }

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
      const page = await newE2EPage();
      const group = "my-group";
      await page.setContent(
        html`<calcite-block-group id="component1" group="${group}" drag-enabled>
            <calcite-block id="one" heading="one" label="One"></calcite-block>
            <calcite-block id="two" heading="two" label="Two"></calcite-block>
          </calcite-block-group>
          <calcite-block-group id="component2" group="${group}" drag-enabled>
            <calcite-block id="three" heading="three" label="Three"></calcite-block>
          </calcite-block-group>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.nextTick);

      let component1Moves = 0;
      let component2Moves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("#component1", (blockGroup: BlockGroup["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.component1CalledTimes = 0;
        blockGroup.addEventListener("calciteBlockGroupOrderChange", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.component1CalledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
          testWindow.fromEl = event.detail.fromEl.id;
          testWindow.toEl = event.detail.toEl.id;
          testWindow.el = event.detail.dragEl.id;
        });
      });

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("#component2", (blockGroup: BlockGroup["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.component2CalledTimes = 0;
        blockGroup.addEventListener("calciteBlockGroupOrderChange", (event: CustomEvent<BlockDragDetail>) => {
          testWindow.component2CalledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
          testWindow.fromEl = event.detail.fromEl.id;
          testWindow.toEl = event.detail.toEl.id;
          testWindow.el = event.detail.dragEl.id;
        });
      });

      async function assertMove(
        componentItemId: string,
        moveFromId: string,
        moveToId: string,
        component1Order: string[],
        component2Order: string[],
        newIndex: number,
        oldIndex: number,
      ): Promise<void> {
        const component = await page.find(`#${componentItemId}`);
        const eventName = `calciteSortHandleMove`;
        // eslint-disable-next-line no-restricted-properties -- workaround for spyOnEvent throwing errors due to circular JSON structures when serializing the event payload
        const event = component.waitForEvent(eventName);
        await page.$eval(
          `#${componentItemId}`,
          (item: Block["el"], moveToId, eventName) => {
            const element = document.querySelector<BlockGroup["el"]>(`#${moveToId}`);
            item.dispatchEvent(
              new CustomEvent(eventName, {
                detail: {
                  moveTo: {
                    element,
                    id: element.id,
                    label: element.label,
                  },
                },
                bubbles: true,
                cancelable: true,
              }),
            );
          },
          moveToId,
          eventName,
        );
        await event;
        await page.waitForChanges();
        const component1Id = "component1";
        const component2Id = "component2";

        const component1After = await findAll(page, `#${component1Id} calcite-block`);
        expect(component1After.length).toBe(component1Order.length);

        for (let i = 0; i < component1After.length; i++) {
          expect(await component1After[i].getProperty("heading")).toBe(component1Order[i]);
        }

        const component2After = await findAll(page, `#${component2Id} calcite-block`);
        expect(component2After.length).toBe(component2Order.length);

        for (let i = 0; i < component2After.length; i++) {
          expect(await component2After[i].getProperty("heading")).toBe(component2Order[i]);
        }

        const results = await page.evaluate(() => {
          const testWindow = window as TestWindow;

          return {
            component1CalledTimes: testWindow.component1CalledTimes,
            component2CalledTimes: testWindow.component2CalledTimes,
            oldIndex: testWindow.oldIndex,
            newIndex: testWindow.newIndex,
            fromEl: testWindow.fromEl,
            toEl: testWindow.toEl,
            el: testWindow.el,
          };
        });

        expect(results.component1CalledTimes).toBe(moveFromId === component1Id ? ++component1Moves : component1Moves);
        expect(results.component2CalledTimes).toBe(moveFromId === component2Id ? ++component2Moves : component2Moves);
        expect(results.newIndex).toBe(newIndex);
        expect(results.oldIndex).toBe(oldIndex);
        expect(results.fromEl).toBe(moveFromId);
        expect(results.toEl).toBe(moveToId);
        expect(results.el).toBe(componentItemId);
      }

      await assertMove("one", "component1", "component2", ["two"], ["one", "three"], 0, 0);
      await assertMove("three", "component2", "component1", ["three", "two"], ["one"], 0, 1);
    });
  });
});
