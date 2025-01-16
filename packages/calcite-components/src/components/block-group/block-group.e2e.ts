import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, hidden, renders, focusable, disabled, defaults, reflects } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { GlobalTestProps, dragAndDrop } from "../../tests/utils";
import { DEBOUNCE } from "../../utils/resources";
import { Reorder } from "../sort-handle/interfaces";
import { SLOTS as BLOCK_SLOTS } from "../block/resources";
import { Block } from "../block/block";
import { BlockDragDetail } from "./interfaces";
import type { BlockGroup } from "./block-group";

const blockHTML = html`<calcite-block heading="heading" description="description" open collapsible>
  <div slot=${BLOCK_SLOTS.icon}>✅</div>
  <div>content</div>
  <label slot=${BLOCK_SLOTS.control}>test <input placeholder="control" /></label>
</calcite-block>`;

describe("calcite-block-group", () => {
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
    ]);
  });

  describe("renders", () => {
    renders("calcite-block-group", { display: "block" });
  });

  describe("is focusable", () => {
    focusable(html`<calcite-block-group> ${blockHTML} </calcite-block-group>`, {
      focusTargetSelector: "calcite-block-group",
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

  // todo
  it("should set the dragHandle property on items", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block-group id="root" drag-enabled group="my-block-group"> ${blockHTML} </calcite-block-group>`,

      // `<calcite-block-group id="root" drag-enabled group="my-list">
      //   <calcite-block open label="Depth 1" description="Item 1">
      //     <calcite-block-group group="my-list">
      //       <calcite-block open label="Depth 2" description="Item 2">
      //         <calcite-block-group drag-enabled group="my-list">
      //           <calcite-block label="Depth 3" description="Item 3">
      //             <calcite-block-group drag-enabled group="my-list"></calcite-block-group>
      //           </calcite-block>
      //           <calcite-block label="Depth 3" description="Item 4"></calcite-block>
      //         </calcite-block-group>
      //       </calcite-block>
      //       <calcite-block label="Depth 2" description="Item 5"></calcite-block>
      //     </calcite-block-group>
      //   </calcite-block>
      //   <calcite-block label="Depth 1" description="Item 6"></calcite-block>
      //   <calcite-block drag-disabled label="Depth 1" description="Item 7"></calcite-block>
      // </calcite-block-group>`
    );

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    let dragHandleValues = [true, false, true, true, false, true, true];

    const items = await page.findAll("calcite-block");

    expect(items.length).toBe(dragHandleValues.length);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(dragHandleValues[i]);
    }

    const rootList = await page.find("#root");

    rootList.setProperty("dragEnabled", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    dragHandleValues = [false, false, true, true, false, false, false];

    expect(items.length).toBe(dragHandleValues.length);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(dragHandleValues[i]);
    }
  });

  // todo
  it("should set the dragHandle property on items which are not direct children", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block-group id="root" drag-enabled group="my-list">
        <div>
          <calcite-block open label="Depth 1" description="Item 1">
            <calcite-block-group group="my-list">
              <div>
                <calcite-block open label="Depth 2" description="Item 2">
                  <calcite-block-group drag-enabled group="my-list">
                    <div>
                      <calcite-block label="Depth 3" description="Item 3">
                        <calcite-block-group drag-enabled group="my-list"></calcite-block-group>
                      </calcite-block>
                    </div>
                    <div><calcite-block label="Depth 3" description="Item 4"></calcite-block></div>
                  </calcite-block-group>
                </calcite-block>
              </div>
              <div><calcite-block label="Depth 2" description="Item 5"></calcite-block></div>
            </calcite-block-group>
          </calcite-block>
        </div>
        <div><calcite-block label="Depth 1" description="Item 6"></calcite-block></div>
        <div><calcite-block drag-disabled label="Depth 1" description="Item 7"></calcite-block></div>
      </calcite-block-group>`,
    );

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    let dragHandleValues = [true, false, true, true, false, true, true];

    const items = await page.findAll("calcite-block");

    expect(items.length).toBe(dragHandleValues.length);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(dragHandleValues[i]);
    }

    const rootList = await page.find("#root");

    rootList.setProperty("dragEnabled", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    dragHandleValues = [false, false, true, true, false, false, false];

    expect(items.length).toBe(dragHandleValues.length);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("dragHandle")).toBe(dragHandleValues[i]);
    }
  });

  describe("drag and drop", () => {
    async function createSimpleBlockGroup(): Promise<E2EPage> {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-block-group drag-enabled id="group1">
          <calcite-block id="one" value="one" label="One"></calcite-block>
          <calcite-block id="two" value="two" label="Two"></calcite-block>
          <calcite-block id="three" value="three" label="Three"></calcite-block>
        </calcite-block-group>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
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
          element: `calcite-block[value="one"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `calcite-block[value="two"]`,
          shadow: "calcite-sort-handle",
        },
      );

      const [first, second] = await page.findAll("calcite-block");
      expect(await first.getProperty("value")).toBe("two");
      expect(await second.getProperty("value")).toBe("one");
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
          <calcite-block value="a" label="A"></calcite-block>
          <calcite-block value="b" label="B"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="numbers" drag-enabled group="numbers">
          <calcite-block value="1" label="One"></calcite-block>
          <calcite-block value="2" label="Two"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="no-group" drag-enabled>
          <calcite-block value="no-group" label="No group"></calcite-block>
        </calcite-block-group>

        <calcite-block-group id="second-letters" drag-enabled group="letters">
          <calcite-block value="c" label="C"></calcite-block>
          <calcite-block value="d" label="D"></calcite-block>
          <calcite-block value="e" label="E"></calcite-block>
          <calcite-block value="f" label="F"></calcite-block>
        </calcite-block-group>
      `);

      await page.waitForChanges();

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
          element: `calcite-block[value="d"]`,
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
          element: `calcite-block[value="e"]`,
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
          element: `calcite-block[value="e"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `#no-group`,
          pointerPosition: {
            vertical: "bottom",
          },
        },
      );

      const [first, second, third, fourth, fifth, sixth, seventh, eight, ninth] = await page.findAll("calcite-block");
      expect(await first.getProperty("value")).toBe("a");
      expect(await second.getProperty("value")).toBe("b");
      expect(await third.getProperty("value")).toBe("d");
      expect(await fourth.getProperty("value")).toBe("1");
      expect(await fifth.getProperty("value")).toBe("2");
      expect(await sixth.getProperty("value")).toBe("no-group");
      expect(await seventh.getProperty("value")).toBe("c");
      expect(await eight.getProperty("value")).toBe("e");
      expect(await ninth.getProperty("value")).toBe("f");

      expect(await page.evaluate(() => (window as TestWindow).calledTimes)).toBe(2);
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
        expectedValueOrder: string[],
        newIndex: number,
        oldIndex: number,
      ): Promise<void> {
        const eventName = `calciteSortHandleReorder`;
        const event = page.waitForEvent(eventName);
        await page.$eval(
          `calcite-block[value="one"]`,
          (item1: Block["el"], reorder, eventName) => {
            item1.dispatchEvent(new CustomEvent(eventName, { detail: { reorder }, bubbles: true }));
          },
          reorder,
          eventName,
        );
        await event;
        await page.waitForChanges();
        const itemsAfter = await page.findAll("calcite-block");
        expect(itemsAfter.length).toBe(3);

        for (let i = 0; i < itemsAfter.length; i++) {
          expect(await itemsAfter[i].getProperty("value")).toBe(expectedValueOrder[i]);
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

        const listId = "list1";

        expect(results.calledTimes).toBe(++totalMoves);
        expect(results.newIndex).toBe(newIndex);
        expect(results.oldIndex).toBe(oldIndex);
        expect(results.fromEl).toBe(listId);
        expect(results.toEl).toBe(listId);
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
        html`<calcite-block-group id="list1" group="${group}" drag-enabled>
            <calcite-block id="one" value="one" label="One"></calcite-block>
            <calcite-block id="two" value="two" label="Two"></calcite-block>
          </calcite-block-group>
          <calcite-block-group id="list2" group="${group}" drag-enabled>
            <calcite-block id="three" value="three" label="Three"></calcite-block>
          </calcite-block-group>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      let list1Moves = 0;
      let list2Moves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("#list1", (blockGroup: BlockGroup["el"]) => {
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
      await page.$eval("#list2", (blockGroup: BlockGroup["el"]) => {
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
        listItemId: string,
        moveFromListId: string,
        moveToListId: string,
        list1Order: string[],
        list2Order: string[],
        newIndex: number,
        oldIndex: number,
      ): Promise<void> {
        const eventName = `calciteSortHandleMove`;
        const event = page.waitForEvent(eventName);
        await page.$eval(
          `#${listItemId}`,
          (item: Block["el"], moveToListId, eventName) => {
            const element = document.querySelector<BlockGroup["el"]>(`#${moveToListId}`);
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
              }),
            );
          },
          moveToListId,
          eventName,
        );
        await event;
        await page.waitForChanges();
        const list1Id = "list1";
        const list2Id = "list2";
        const list1After = await page.findAll(`#${list1Id} calcite-block`);
        expect(list1After.length).toBe(list1Order.length);

        for (let i = 0; i < list1After.length; i++) {
          expect(await list1After[i].getProperty("value")).toBe(list1Order[i]);
        }

        const list2After = await page.findAll(`#${list2Id} calcite-block`);
        expect(list2After.length).toBe(list2Order.length);

        for (let i = 0; i < list2After.length; i++) {
          expect(await list2After[i].getProperty("value")).toBe(list2Order[i]);
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

        expect(results.component1CalledTimes).toBe(moveFromListId === list1Id ? ++list1Moves : list1Moves);
        expect(results.component2CalledTimes).toBe(moveFromListId === list2Id ? ++list2Moves : list2Moves);
        expect(results.newIndex).toBe(newIndex);
        expect(results.oldIndex).toBe(oldIndex);
        expect(results.fromEl).toBe(moveFromListId);
        expect(results.toEl).toBe(moveToListId);
        expect(results.el).toBe(listItemId);
      }

      await assertMove("one", "list1", "list2", ["two"], ["one", "three"], 0, 0);
      await assertMove("three", "list2", "list1", ["three", "two"], ["one"], 0, 1);
    });
  });
});
