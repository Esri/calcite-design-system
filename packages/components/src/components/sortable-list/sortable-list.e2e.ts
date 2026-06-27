import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { accessible } from "../../tests/commonTests";
import { dragAndDrop, findAll } from "../../tests/utils/puppeteer";

describe("accessible", () => {
  accessible(`<calcite-sortable-list></calcite-sortable-list>`);
});

const worksUsingMouse = async (page: E2EPage): Promise<void> => {
  await dragAndDrop(page, {
    originElement: "#one",
    handleElement: "#one calcite-handle",
    destinationElement: "#two",
  });

  const [first, second] = await findAll(page, "div");
  expect(await first.getProperty("id")).toBe("two");
  expect(await second.getProperty("id")).toBe("one");
};

const worksUsingKeyboard = async (page: E2EPage): Promise<void> => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.waitForChanges();
  await page.keyboard.press("ArrowDown");
  const itemsAfter = await findAll(page, "div");
  expect(await itemsAfter[0].getProperty("id")).toBe("two");
  expect(await itemsAfter[1].getProperty("id")).toBe("one");
};

describe("drag and drop", () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage({
      html: `<calcite-sortable-list>
        <div id="one"><calcite-handle></calcite-handle>1</div>
        <div id="two"><calcite-handle></calcite-handle>2</div>
        <div id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`,
    });
  });

  it("works using a mouse", () => worksUsingMouse(page));

  it("works using a keyboard", () => worksUsingKeyboard(page));

  it("skips Calcite reorder handling when calciteListBeforeOrderChange is canceled", async () => {
    await page.evaluate(() => {
      const list = document.querySelector("calcite-sortable-list") as HTMLElement;
      const testWindow = window as typeof window & {
        beforeCalledTimes: number;
        orderCalledTimes: number;
      };

      testWindow.beforeCalledTimes = 0;
      testWindow.orderCalledTimes = 0;

      list.addEventListener("calciteListBeforeOrderChange", (event) => {
        testWindow.beforeCalledTimes++;
        event.preventDefault();
      });

      list.addEventListener("calciteListOrderChange", () => {
        testWindow.orderCalledTimes++;
      });
    });

    await dragAndDrop(page, {
      originElement: "#one",
      handleElement: "#one calcite-handle",
      destinationElement: "#two",
    });

    const results = await page.evaluate(() => {
      const testWindow = window as typeof window & {
        beforeCalledTimes: number;
        orderCalledTimes: number;
      };

      return {
        beforeCalledTimes: testWindow.beforeCalledTimes,
        orderCalledTimes: testWindow.orderCalledTimes,
      };
    });

    expect(results.beforeCalledTimes).toBe(1);
    expect(results.orderCalledTimes).toBe(0);
  });

  it("fires before and order-change around the reorder mutation", async () => {
    await page.evaluate(() => {
      const list = document.querySelector("calcite-sortable-list") as HTMLElement;
      const testWindow = window as typeof window & {
        callSequence: string[];
        orderFirstId: string;
      };

      testWindow.callSequence = [];
      testWindow.orderFirstId = "";

      list.addEventListener("calciteListBeforeOrderChange", () => {
        testWindow.callSequence.push("before");
      });

      list.addEventListener("calciteListOrderChange", () => {
        testWindow.callSequence.push("order");
        testWindow.orderFirstId = list.querySelector("div")?.id ?? "";
      });
    });

    await dragAndDrop(page, {
      originElement: "#one",
      handleElement: "#one calcite-handle",
      destinationElement: "#two",
    });

    const results = await page.evaluate(() => {
      const testWindow = window as typeof window & {
        callSequence: string[];
        orderFirstId: string;
      };

      return {
        callSequence: testWindow.callSequence,
        orderFirstId: testWindow.orderFirstId,
      };
    });

    expect(results.callSequence).toEqual(["before", "order"]);
    expect(results.orderFirstId).toBe("two");
  });
});

describe("drag and drop with dragSelector", () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage({
      html: `<calcite-sortable-list drag-selector=".calcite-sortable">
        <div class="calcite-sortable" id="one"><calcite-handle></calcite-handle>1</div>
        <div class="calcite-sortable" id="two"><calcite-handle></calcite-handle>2</div>
        <div class="calcite-sortable" id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`,
    });
  });

  it("works using a mouse", () => worksUsingMouse(page));

  it("works using a keyboard", () => worksUsingKeyboard(page));
});

describe("drag and drop between horizontal lists", () => {
  it("supports dropping at the end of the destination list", async () => {
    const page = await newE2EPage({
      html: `<calcite-sortable-list id="first" layout="horizontal" group="letters">
        <div id="a"><calcite-handle></calcite-handle>A</div>
        <div id="b"><calcite-handle></calcite-handle>B</div>
      </calcite-sortable-list>
      <calcite-sortable-list id="second" layout="horizontal" group="letters">
        <div id="c"><calcite-handle></calcite-handle>C</div>
        <div id="d"><calcite-handle></calcite-handle>D</div>
      </calcite-sortable-list>`,
    });

    await dragAndDrop(page, {
      originElement: "#d",
      handleElement: "#d calcite-handle",
      destinationElement: {
        element: "#first",
        pointerPosition: {
          horizontal: "right",
          vertical: "center",
        },
      },
    });

    const [first, second, third, fourth] = await findAll(page, "div");

    expect(await first.getProperty("id")).toBe("a");
    expect(await second.getProperty("id")).toBe("b");
    expect(await third.getProperty("id")).toBe("d");
    expect(await fourth.getProperty("id")).toBe("c");
  });
});
