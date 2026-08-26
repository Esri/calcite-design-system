import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { activeCellTestAttribute, CSS as ListItemCSS } from "../list-item/resources";
import { findAll, getFocusedElementProp, isElementFocused, newProgrammaticE2EPage } from "../../tests/utils/puppeteer";
import { DEBOUNCE } from "../../utils/resources";
import { mockConsole } from "../../tests/utils/logging";
import { GlobalTestProps } from "../../tests/utils/types";
import type { List } from "./list";

mockConsole();

it("should set the displayMode property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list id="root" display-mode="nested" group="my-list">
      <calcite-list-item open label="Depth 1" description="Item 1">
        <calcite-list group="my-list">
          <calcite-list-item open label="Depth 2" description="Item 2">
            <calcite-list display-mode="nested" group="my-list">
              <calcite-list-item label="Depth 3" description="Item 3">
                <calcite-list display-mode="nested" group="my-list"></calcite-list>
              </calcite-list-item>
              <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
            </calcite-list>
          </calcite-list-item>
          <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
        </calcite-list>
      </calcite-list-item>
      <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
      <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const items = await findAll(page, "calcite-list-item");

  expect(items.length).toBe(7);

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("displayMode")).toBe("nested");
  }

  const rootList = await page.find("#root");

  rootList.setProperty("displayMode", "flat");
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  expect(items.length).toBe(7);

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("displayMode")).toBe("flat");
  }
});

it("should set the setSize and setPosition properties on nested items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list display-mode="nested" label="Park features" drag-enabled group="nested-lists">
      <calcite-list-item open label="Trails" value="trails">
        <calcite-list id="nested" label="Trails" display-mode="nested" drag-enabled group="nested-lists">
          <calcite-list-item label="Hiking trails" value="hiking-trails">
            <calcite-action slot="actions-end" icon="layer" text="Hiking trails layer"></calcite-action>
          </calcite-list-item>
          <calcite-list-item label="Multi-use trails" value="multi-use-trails">
            <calcite-action slot="actions-end" icon="layer" text="Multi-use trails layer"></calcite-action>
          </calcite-list-item>
          <calcite-list-item label="Boardwalks" value="boardwalks">
            <calcite-action slot="actions-end" icon="layer" text="Boardwalks layer"></calcite-action>
          </calcite-list-item>
          <calcite-list-item label="Interpretive trails" value="interpretive-trails">
            <calcite-action slot="actions-end" icon="layer" text="Interpretive trails layer"></calcite-action>
          </calcite-list-item>
        </calcite-list>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls" value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Rivers" value="rivers">
        <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Estuaries" value="estuaries">
        <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>
      </calcite-list-item>
    </calcite-list>`,
  );
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const items = await findAll(page, "#nested calcite-list-item");

  expect(await items[0].getProperty("setPosition")).toBe(1);
  expect(await items[0].getProperty("setSize")).toBe(4);

  expect(await items[1].getProperty("setPosition")).toBe(2);
  expect(await items[1].getProperty("setSize")).toBe(4);

  expect(await items[2].getProperty("setPosition")).toBe(3);
  expect(await items[2].getProperty("setSize")).toBe(4);

  expect(await items[3].getProperty("setPosition")).toBe(4);
  expect(await items[3].getProperty("setSize")).toBe(4);
});

it("should set the dragHandle property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list id="root" drag-enabled group="my-list">
      <calcite-list-item open label="Depth 1" description="Item 1">
        <calcite-list group="my-list">
          <calcite-list-item open label="Depth 2" description="Item 2">
            <calcite-list drag-enabled group="my-list">
              <calcite-list-item label="Depth 3" description="Item 3">
                <calcite-list drag-enabled group="my-list"></calcite-list>
              </calcite-list-item>
              <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
            </calcite-list>
          </calcite-list-item>
          <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
        </calcite-list>
      </calcite-list-item>
      <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
      <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  let dragHandleValues = [true, false, true, true, false, true, true];

  const items = await findAll(page, "calcite-list-item");

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

it("should set the sortDisabled property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list id="root" drag-enabled sort-disabled group="my-block-group">
      <calcite-list-item id="one" heading="one" label="One"></calcite-list-item>
      <calcite-list-item id="two" heading="two" label="Two"></calcite-list-item>
      <calcite-list-item id="three" heading="three" label="Three"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  const items = await findAll(page, "calcite-list-item");

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("sortDisabled")).toBe(true);
  }

  const list = await page.find("#root");

  list.setProperty("sortDisabled", false);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("sortDisabled")).toBe(false);
  }
});

it("should set the dragHandle property on items which are not direct children", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list id="root" drag-enabled group="my-list">
      <div>
        <calcite-list-item open label="Depth 1" description="Item 1">
          <calcite-list group="my-list">
            <div>
              <calcite-list-item open label="Depth 2" description="Item 2">
                <calcite-list drag-enabled group="my-list">
                  <div>
                    <calcite-list-item label="Depth 3" description="Item 3">
                      <calcite-list drag-enabled group="my-list"></calcite-list>
                    </calcite-list-item>
                  </div>
                  <div><calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item></div>
                </calcite-list>
              </calcite-list-item>
            </div>
            <div><calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item></div>
          </calcite-list>
        </calcite-list-item>
      </div>
      <div><calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item></div>
      <div><calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item></div>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  let dragHandleValues = [true, false, true, true, false, true, true];

  const items = await findAll(page, "calcite-list-item");

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

it("should set the scale property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list id="root" display-mode="nested" group="my-list">
      <calcite-list-item open label="Depth 1" description="Item 1">
        <calcite-list group="my-list">
          <calcite-list-item open label="Depth 2" description="Item 2">
            <calcite-list display-mode="nested" group="my-list">
              <calcite-list-item label="Depth 3" description="Item 3">
                <calcite-list display-mode="nested" group="my-list"></calcite-list>
              </calcite-list-item>
              <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
            </calcite-list>
          </calcite-list-item>
          <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
        </calcite-list>
      </calcite-list-item>
      <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
      <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const rootListItems = await findAll(page, "#root > calcite-list-item");

  expect(rootListItems).toHaveLength(3);

  for (let i = 0; i < rootListItems.length; i++) {
    expect(await rootListItems[i].getProperty("scale")).toBe("m");
  }

  const rootList = await page.find("#root");
  rootList.setProperty("scale", "s");

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  for (let i = 0; i < rootListItems.length; i++) {
    expect(await rootListItems[i].getProperty("scale")).toBe("s");
  }

  rootList.setProperty("scale", "m");

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  for (let i = 0; i < rootListItems.length; i++) {
    expect(await rootListItems[i].getProperty("scale")).toBe("m");
  }

  rootList.setProperty("scale", "l");

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  for (let i = 0; i < rootListItems.length; i++) {
    expect(await rootListItems[i].getProperty("scale")).toBe("l");
  }
});

it("disabling and enabling an item restores actions from being tabbable", async () => {
  const page = await newE2EPage();
  await page.setContent(html`
    <calcite-list selection-mode="multiple">
      <calcite-list-item label="first">
        <calcite-action id="action-1" icon="information" slot="actions-end"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="second">
        <calcite-action id="action-2" icon="information" slot="actions-end"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="third">
        <calcite-action id="action-3" icon="information" slot="actions-end"></calcite-action>
      </calcite-list-item>
    </calcite-list>
  `);

  const [firstItem, secondItem] = await findAll(page, "calcite-list-item");

  await firstItem.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  expect(await getFocusedElementProp(page, "id")).toBe("action-3");

  secondItem.setProperty("disabled", true);
  await page.waitForChanges();
  secondItem.setProperty("disabled", false);
  await page.waitForChanges();

  await firstItem.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  expect(await getFocusedElementProp(page, "id")).toBe("action-3");
});

it("should border nested list items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list>
      <calcite-list-item
        id="firstItem"
        label="Hiking trails"
        description="Designated routes for hikers to use."
        value="hiking-trails"
      >
        <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
        <calcite-list>
          <calcite-list-item
            id="firstChildItem"
            label="Hiking trails"
            description="Designated routes for hikers to use."
            value="hiking-trails"
          >
            <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
          </calcite-list-item>
          <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
            <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
          </calcite-list-item>
          <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
            <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
          </calcite-list-item>
        </calcite-list>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
        <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
      </calcite-list-item>
    </calcite-list>`,
  );
  await page.waitForChanges();

  const firstItem = await page.find("#firstItem");
  const firstChildItem = await page.find("#firstChildItem");

  expect(await firstItem.getProperty("bordered")).toBe(true);
  expect(await firstChildItem.getProperty("bordered")).toBe(false);

  firstItem.setProperty("open", true);
  await page.waitForChanges();

  expect(await firstItem.getProperty("bordered")).toBe(true);
  expect(await firstChildItem.getProperty("bordered")).toBe(true);
});

describe("filtering", () => {
  mockConsole();

  it("honors filterLabel property", async () => {
    const page = await newE2EPage();
    const label = "hello world";
    await page.setContent(`<calcite-list filter-enabled filter-label="${label}"></calcite-list>`);

    const filter = await page.find(`calcite-list >>> calcite-filter`);
    expect(await filter.getProperty("label")).toBe(label);
  });

  it("navigating items after filtering", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list drag-enabled filter-enabled>
        <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
        <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    const eventSpy = await list.spyOnEvent("calciteListChange");
    const filter = await page.find(`calcite-list >>> calcite-filter`);
    const items = await findAll(list, "calcite-list-item");
    expect(items.length).toBe(2);
    await page.waitForTimeout(DEBOUNCE.filter);
    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(2);
    expect(await list.getProperty("filterText")).toBe("");

    expect(await items[0].getProperty("filterHidden")).toBe(false);
    expect(await items[0].getProperty("setPosition")).toBe(1);
    expect(await items[0].getProperty("setSize")).toBe(2);

    expect(await items[1].getProperty("filterHidden")).toBe(false);
    expect(await items[1].getProperty("setPosition")).toBe(2);
    expect(await items[1].getProperty("setSize")).toBe(2);

    await filter.callMethod("setFocus");
    await page.waitForChanges();

    const calciteListFilterEventSpy = await list.spyOnEvent("calciteListFilter");
    await page.keyboard.type("one");
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    await calciteListFilterEventSpy.next();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("one");

    expect(await items[0].getProperty("filterHidden")).toBe(false);
    expect(await items[0].getProperty("setPosition")).toBe(1);
    expect(await items[0].getProperty("setSize")).toBe(1);

    expect(await items[1].getProperty("filterHidden")).toBe(true);
    expect(await items[1].getProperty("setPosition")).toBe(undefined);
    expect(await items[1].getProperty("setSize")).toBe(undefined);

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    await page.keyboard.type("two");
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    await calciteListFilterEventSpy.next();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("two");

    expect(await items[0].getProperty("filterHidden")).toBe(true);
    expect(await items[0].getProperty("setPosition")).toBe(undefined);
    expect(await items[0].getProperty("setSize")).toBe(undefined);

    expect(await items[1].getProperty("filterHidden")).toBe(false);
    expect(await items[1].getProperty("setPosition")).toBe(1);
    expect(await items[1].getProperty("setSize")).toBe(1);

    await page.keyboard.type(" blah");
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    await calciteListFilterEventSpy.next();
    expect(eventSpy).toHaveReceivedEventTimes(0);
    expect(await list.getProperty("filteredItems")).toHaveLength(0);
    expect(await list.getProperty("filteredData")).toHaveLength(0);
    expect(await list.getProperty("filterText")).toBe("two blah");

    expect(await items[0].getProperty("filterHidden")).toBe(true);
    expect(await items[0].getProperty("setPosition")).toBe(undefined);
    expect(await items[0].getProperty("setSize")).toBe(undefined);

    expect(await items[1].getProperty("filterHidden")).toBe(true);
    expect(await items[1].getProperty("setPosition")).toBe(undefined);
    expect(await items[1].getProperty("setSize")).toBe(undefined);
  });

  it("selecting items after filtering", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled>
        <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
        <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
        <calcite-list-item value="three" label="Three" description="hello world"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();

    async function getSelectedItemValues(): Promise<string[]> {
      return await page.$eval("calcite-list", (list: List["el"]) => list.selectedItems.map((item) => item.value));
    }

    const list = await page.find("calcite-list");
    const listItems = await findAll(page, "calcite-list-item");
    await page.waitForTimeout(DEBOUNCE.filter);
    expect(await list.getProperty("filteredItems")).toHaveLength(3);
    expect(await list.getProperty("filteredData")).toHaveLength(3);
    expect(await list.getProperty("filterText")).toBe("");

    listItems[0].setProperty("selected", true);
    list.setProperty("filterText", "two");
    await page.waitForTimeout(DEBOUNCE.filter);
    await page.waitForChanges();
    let selectedItemValues = await getSelectedItemValues();
    expect(selectedItemValues).toHaveLength(1);
    expect(selectedItemValues[0]).toBe("one");

    listItems[1].setProperty("selected", true);
    await page.waitForChanges();
    selectedItemValues = await getSelectedItemValues();
    expect(selectedItemValues).toHaveLength(2);
    expect(selectedItemValues[0]).toBe("one");
    expect(selectedItemValues[1]).toBe("two");

    list.setProperty("filterText", "three");
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    listItems[2].setProperty("selected", true);
    await page.waitForChanges();
    selectedItemValues = await getSelectedItemValues();
    expect(selectedItemValues).toHaveLength(3);
    expect(selectedItemValues[0]).toBe("one");
    expect(selectedItemValues[1]).toBe("two");
    expect(selectedItemValues[2]).toBe("three");

    listItems[0].setProperty("selected", false);
    await page.waitForChanges();
    selectedItemValues = await getSelectedItemValues();
    expect(selectedItemValues).toHaveLength(2);
    expect(selectedItemValues[0]).toBe("two");
    expect(selectedItemValues[1]).toBe("three");
  });

  it("updating items after filtering", async () => {
    const matchingFont = "Courier";

    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled filter-text="">
        <calcite-list-item value="item1" label="${matchingFont}" description="list1"></calcite-list-item>
        <calcite-list-item value="item2" label="${matchingFont} 2" description="list1"></calcite-list-item>
        <calcite-list-item value="item3" label="Other Font" description="list1"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();

    const list = await page.find("calcite-list");
    let visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems).toHaveLength(3);
    for (const item of visibleItems) {
      expect(await item.getProperty("description")).toBe("list1");
    }

    list.setProperty("filterText", matchingFont);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");
    expect(visibleItems).toHaveLength(2);
    for (const item of visibleItems) {
      expect(await item.getProperty("description")).toBe("list1");
    }

    list.innerHTML = html`
      <calcite-list-item value="item4" label="${matchingFont}" description="list2"></calcite-list-item>
      <calcite-list-item value="item5" label="${matchingFont} 2" description="list2"></calcite-list-item>
      <calcite-list-item value="item6" label="Other Font" description="list2"></calcite-list-item>
    `;

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(await list.getProperty("filterText")).toBe(matchingFont);
    visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems).toHaveLength(2);
    for (const item of visibleItems) {
      expect(await item.getProperty("description")).toBe("list2");
    }
  });

  it("updating items after filtering with filterPredicate property", async () => {
    const allValue = "all";
    const matchingFont = "Courier";

    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled filter-text="">
        <calcite-list-item value="item1" label="${matchingFont}" description="list1"></calcite-list-item>
        <calcite-list-item value="item2" label="${matchingFont} 2" description="list1"></calcite-list-item>
        <calcite-list-item value="item3" label="Other Font" description="list1"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();

    const list = await page.find("calcite-list");

    await page.$eval(
      "calcite-list",
      (list: List["el"], allValue) => {
        list.filterPredicate = (item) => {
          if (list.filterText === allValue) {
            return true;
          }

          return item.value === "item2";
        };
      },
      allValue,
    );

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    let visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems).toHaveLength(1);
    expect(await visibleItems[0].getProperty("value")).toBe("item2");

    list.setProperty("filterText", allValue);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");
    expect(visibleItems).toHaveLength(3);

    for (const item of visibleItems) {
      expect(await item.getProperty("description")).toBe("list1");
    }
  });

  it("filterPredicate will work without filterEnabled", async () => {
    const matchingFont = "Courier";

    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list>
        <calcite-list-item value="item1" label="${matchingFont}" description="list1"></calcite-list-item>
        <calcite-list-item value="item2" label="${matchingFont} 2" description="list1"></calcite-list-item>
        <calcite-list-item value="item3" label="Other Font" description="list1"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();

    await page.$eval("calcite-list", (list: List["el"]) => {
      list.filterPredicate = (item) => {
        return item.value === "item2";
      };
    });

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    const visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems).toHaveLength(1);
    expect(await visibleItems[0].getProperty("value")).toBe("item2");
  });

  it("filters initially", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled filter-text="match">
        <calcite-list-item
          id="label-match"
          label="match"
          description="description-1"
          value="value-1"
        ></calcite-list-item>
        <calcite-list-item
          id="description-match"
          label="label-2"
          description="match"
          value="value-1"
        ></calcite-list-item>
        <calcite-list-item
          id="value-not-matched-by-default"
          label="label-3"
          description="description-3"
          value="match"
        ></calcite-list-item>
        <calcite-list-item
          id="no-match"
          label="label-4"
          description="description-4"
          value="value-4"
        ></calcite-list-item>
      </calcite-list>
    `);

    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(2);

    const visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems.map((item) => item.id)).toEqual(["label-match", "description-match"]);
  });

  it("supports filterProps", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled filter-text="match">
        <calcite-list-item
          id="label-match"
          label="match"
          description="description-1"
          value="value-1"
        ></calcite-list-item>
        <calcite-list-item
          id="description-match"
          label="label-2"
          description="match"
          value="value-1"
        ></calcite-list-item>
        <calcite-list-item
          id="value-not-matched-by-default"
          label="label-3"
          description="description-3"
          value="match"
        ></calcite-list-item>
        <calcite-list-item
          id="no-match"
          label="label-4"
          description="description-4"
          value="value-4"
        ></calcite-list-item>
      </calcite-list>
    `);

    await page.waitForChanges();
    const list = await page.find("calcite-list");
    list.setProperty("filterProps", ["label", "description"]);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(2);

    const visibleItems = await findAll(page, "calcite-list-item:not([filter-hidden])");

    expect(visibleItems.map((item) => item.id)).toEqual(["label-match", "description-match"]);
  });

  it("should show no-results content when filter does not match", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-list>
        <calcite-list-item label="Apples" value="apples"></calcite-list-item>
        <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>
        <calcite-list-item label="Pears" value="pears"></calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No fruits found</div>
          <div slot="message">Try a different fruit?</div>
        </calcite-notice>
      </calcite-list>`,
    );
    await page.waitForChanges();

    const noResultsContainer = await page.find(`calcite-list >>> [data-test-id="no-results-container"]`);

    expect(await noResultsContainer.isVisible()).toBe(false);

    const list = await page.find("calcite-list");
    list.setProperty("filterText", "Bananas");
    await page.waitForChanges();
    expect(await noResultsContainer.isVisible()).toBe(false);

    list.setProperty("filterEnabled", true);
    await page.waitForChanges();
    expect(await noResultsContainer.isVisible()).toBe(true);
  });

  it("subsequently appended lists should initialize filter data consistently", async () => {
    const page = await newProgrammaticE2EPage();
    type TestWindow = GlobalTestProps<{
      createTestList: () => void;
    }>;

    await page.evaluate(() => {
      (window as TestWindow).createTestList = function createTestList(): void {
        const item1 = document.createElement("calcite-list-item");
        item1.label = "item A";
        item1.value = "item A";

        const item2 = document.createElement("calcite-list-item");
        item2.label = "item B";
        item2.value = "item B";

        const item3 = document.createElement("calcite-list-item");
        item3.label = "item C";
        item3.value = "item C";

        const list = document.createElement("calcite-list");
        list.label = "items";
        list.filterEnabled = true;

        list.append(item1, item2, item3);
        document.body.append(list);
      };
    });

    await page.evaluate(() => {
      (window as TestWindow).createTestList();
    });
    await page.waitForChanges();

    await page.$eval("calcite-list", (list) => {
      list.remove();
      (window as TestWindow).createTestList();
    });
    await page.waitForChanges();

    const filter = await page.find(`calcite-list >>> calcite-filter`);
    await filter.callMethod("setFocus");
    await page.keyboard.type("A");
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    const list = await page.find("calcite-list");
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
  });
});

it("should support shift click to select multiple items", async () => {
  const clickItemContent = (item: Element, selector: string) => {
    item.shadowRoot!.querySelector(selector)!.dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
  };

  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list selection-mode="multiple">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" label="hello 3" description="world 3"></calcite-list-item>
      <calcite-list-item id="item-4" label="hello 4" description="world 4"></calcite-list-item>
    </calcite-list>`,
  );
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const list = await page.find("calcite-list");
  const items = await findAll(page, "calcite-list-item");

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(false);
  expect(await items[3].getProperty("selected")).toBe(false);

  const eventSpy = await list.spyOnEvent("calciteListChange");

  await items[0].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(1);
  expect(await list.getProperty("selectedItems")).toHaveLength(1);

  expect(await items[0].getProperty("selected")).toBe(true);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(false);
  expect(await items[3].getProperty("selected")).toBe(false);

  await page.$eval("#item-4", clickItemContent, `.${ListItemCSS.contentContainer}`);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(2);
  expect(await list.getProperty("selectedItems")).toHaveLength(4);

  expect(await items[0].getProperty("selected")).toBe(true);
  expect(await items[1].getProperty("selected")).toBe(true);
  expect(await items[2].getProperty("selected")).toBe(true);
  expect(await items[3].getProperty("selected")).toBe(true);

  await items[3].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(3);
  expect(await list.getProperty("selectedItems")).toHaveLength(3);

  expect(await items[0].getProperty("selected")).toBe(true);
  expect(await items[1].getProperty("selected")).toBe(true);
  expect(await items[2].getProperty("selected")).toBe(true);
  expect(await items[3].getProperty("selected")).toBe(false);

  await page.$eval("#item-1", clickItemContent, `.${ListItemCSS.contentContainer}`);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(4);
  expect(await list.getProperty("selectedItems")).toHaveLength(0);

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(false);
  expect(await items[3].getProperty("selected")).toBe(false);
});

it("should update active item on init and click", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list selection-mode="none">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`,
  );
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const list = await page.find("calcite-list");
  const items = await findAll(page, "calcite-list-item");

  expect(await items[0].getProperty("active")).toBe(true);
  expect(await items[1].getProperty("active")).toBe(false);
  expect(await items[2].getProperty("active")).toBe(false);

  const eventSpy = await list.spyOnEvent("calciteInternalListItemActive");

  await items[1].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(1);

  expect(await items[0].getProperty("active")).toBe(false);
  expect(await items[1].getProperty("active")).toBe(true);
  expect(await items[2].getProperty("active")).toBe(false);
});

it("should prevent de-selection of selected item in single-persist mode", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list selection-mode="single-persist">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const items = await findAll(page, "calcite-list-item");

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(true);

  const eventSpy = await page.spyOnEvent("calciteListItemSelect");

  await items[2].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(1);

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(true);
});

it("should correctly allow de-selection and change of selected item in single mode", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-list selection-mode="single">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);

  const items = await findAll(page, "calcite-list-item");

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(true);

  const eventSpy = await page.spyOnEvent("calciteListItemSelect");

  await items[2].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(1);

  expect(await items[0].getProperty("selected")).toBe(false);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(false);

  await items[0].click();

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(eventSpy).toHaveReceivedEventTimes(2);

  expect(await items[0].getProperty("selected")).toBe(true);
  expect(await items[1].getProperty("selected")).toBe(false);
  expect(await items[2].getProperty("selected")).toBe(false);
});

it("should emit calciteListChange on selection change", async () => {
  const page = await newE2EPage();
  await page.setContent(html`
    <calcite-list selection-mode="single">
      <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
      <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
    </calcite-list>
  `);
  await page.waitForChanges();
  const list = await page.find("calcite-list");
  const listItemOne = await page.find(`calcite-list-item[value=one]`);
  const listItemOneContentContainer = await page.find(
    `calcite-list-item[value=one] >>> .${ListItemCSS.contentContainer}`,
  );

  const calciteListChangeEventSpy = await list.spyOnEvent("calciteListChange");
  await listItemOneContentContainer.click();
  await calciteListChangeEventSpy.next();

  expect(await listItemOne.getProperty("selected")).toBe(true);
  expect(await list.getProperty("selectedItems")).toHaveLength(1);

  await listItemOneContentContainer.click();
  await calciteListChangeEventSpy.next();
  expect(await listItemOne.getProperty("selected")).toBe(false);
  expect(await list.getProperty("selectedItems")).toHaveLength(0);

  listItemOne.setProperty("selected", true);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(await listItemOne.getProperty("selected")).toBe(true);
  expect(await list.getProperty("selectedItems")).toHaveLength(1);

  listItemOne.setProperty("selected", false);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.filter);
  expect(await listItemOne.getProperty("selected")).toBe(false);
  expect(await list.getProperty("selectedItems")).toHaveLength(0);
});

describe("keyboard navigation", () => {
  it("should navigate via ArrowUp, ArrowDown, Home, and End", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list>
        <calcite-list-item id="one" value="one" label="One" description="hello world"></calcite-list-item>
        <calcite-list-item id="two" value="two" label="Two" description="hello world"></calcite-list-item>
        <calcite-list-item
          disabled
          id="three"
          value="three"
          label="three"
          description="hello world"
        ></calcite-list-item>
        <calcite-list-item
          closable
          closed
          id="four"
          value="four"
          label="four"
          description="hello world"
        ></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await list.callMethod("setFocus");
    await page.waitForChanges();

    expect(await isElementFocused(page, "#one")).toBe(true);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#two")).toBe(true);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#two")).toBe(true);

    await list.press("ArrowUp");

    expect(await isElementFocused(page, "#one")).toBe(true);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#two")).toBe(true);

    const calciteListChange = await page.spyOnEvent("calciteListChange");
    const listItemThree = await page.find("#three");
    listItemThree.setProperty("disabled", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    expect(calciteListChange).toHaveReceivedEventTimes(0);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#three")).toBe(true);

    const listItemFour = await page.find("#four");
    listItemFour.setProperty("closed", false);
    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);
    expect(calciteListChange).toHaveReceivedEventTimes(0);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#four")).toBe(true);

    await list.press("Home");

    expect(await isElementFocused(page, "#one")).toBe(true);

    await list.press("End");

    expect(await isElementFocused(page, "#four")).toBe(true);
  });

  it("should navigate via ArrowUp, ArrowDown with filtered items", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list filter-enabled filter-text="water">
        <calcite-list-item id="one" value="fire" label="fire" description="fire"></calcite-list-item>
        <calcite-list-item id="two" value="fire" label="fire" description="fire"></calcite-list-item>
        <calcite-list-item id="three" value="fire" label="fire" description="fire"></calcite-list-item>
        <calcite-list-item id="four" value="water" label="water" description="water"></calcite-list-item>
        <calcite-list-item id="five" value="water" label="water" description="water"></calcite-list-item>
        <calcite-list-item id="six" value="water" label="water" description="water"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await page.waitForTimeout(DEBOUNCE.filter);
    await list.callMethod("setFocus");
    await page.waitForChanges();

    expect(await isElementFocused(page, "calcite-filter", { shadowed: true })).toBe(true);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#four")).toBe(true);

    await list.press("ArrowDown");

    expect(await isElementFocused(page, "#five")).toBe(true);

    await list.press("ArrowUp");

    expect(await isElementFocused(page, "#four")).toBe(true);

    await list.press("ArrowUp");

    expect(await isElementFocused(page, "calcite-filter", { shadowed: true })).toBe(true);
  });

  it("should navigate via ArrowRight and ArrowLeft", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list display-mode="nested">
        <calcite-list-item id="one" value="one" label="One" description="hello world">
          <calcite-action
            appearance="transparent"
            icon="ellipsis"
            text="menu"
            label="menu"
            slot="actions-end"
          ></calcite-action>
          <calcite-list>
            <calcite-list-item id="two" value="two" label="Two" description="hello world">
              <calcite-action
                appearance="transparent"
                icon="ellipsis"
                text="menu"
                label="menu"
                slot="actions-end"
              ></calcite-action
            ></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await list.callMethod("setFocus");
    await page.waitForChanges();

    const one = await page.find("#one");
    expect(await one.getProperty("open")).toBe(false);

    expect(await isElementFocused(page, "#one")).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, `.${ListItemCSS.contentContainer}`, { shadowed: true })).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, "calcite-action")).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, `.${ListItemCSS.contentContainer}`, { shadowed: true })).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(false);
  });

  it("should navigate a draggable list via ArrowRight and ArrowLeft", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list display-mode="nested" drag-enabled>
        <calcite-list-item id="one" value="one" label="One" description="hello world">
          <calcite-action
            appearance="transparent"
            icon="ellipsis"
            text="menu"
            label="menu"
            slot="actions-end"
          ></calcite-action>
          <calcite-list>
            <calcite-list-item id="two" value="two" label="Two" description="hello world">
              <calcite-action
                appearance="transparent"
                icon="ellipsis"
                text="menu"
                label="menu"
                slot="actions-end"
              ></calcite-action
            ></calcite-list-item>
            <calcite-list-item id="three" value="three" label="Three" description="hello world">
              <calcite-action
                appearance="transparent"
                icon="ellipsis"
                text="menu"
                label="menu"
                slot="actions-end"
              ></calcite-action
            ></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item id="four" value="four" label="Four" description="hello world">
          <calcite-action
            appearance="transparent"
            icon="ellipsis"
            text="menu"
            label="menu"
            slot="actions-end"
          ></calcite-action
        ></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await list.callMethod("setFocus");
    await page.waitForChanges();

    const one = await page.find("#one");
    expect(await one.getProperty("open")).toBe(false);

    expect(await isElementFocused(page, "#one")).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, `calcite-sort-handle`, { shadowed: true })).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, `.${ListItemCSS.contentContainer}`, { shadowed: true })).toBe(true);

    await list.press("ArrowRight");

    expect(await isElementFocused(page, "calcite-action")).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, `.${ListItemCSS.contentContainer}`, { shadowed: true })).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, `calcite-sort-handle`, { shadowed: true })).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(true);

    await list.press("ArrowLeft");

    expect(await isElementFocused(page, "#one")).toBe(true);
    expect(await one.getProperty("open")).toBe(false);
  });

  it("should allow tabbing through slotted actions within a cell", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-list>
        <calcite-list-item
          id="item1"
          label="Hiking trails"
          description="Designated routes for hikers to use."
          value="hiking-trails"
        >
          <calcite-action id="action1" slot="actions-start" icon="gear" text="Setup the trails layer"></calcite-action>
          <calcite-action
            id="action2"
            slot="actions-start"
            icon="hammer"
            text="Troubleshoot the trails layer"
          ></calcite-action>
          <calcite-action id="action3" slot="actions-end" icon="bookmark" text="Bookmark trails layer"></calcite-action>
          <calcite-action id="action4" slot="actions-end" icon="plus" text="Add trails layer"></calcite-action>
        </calcite-list-item>
      </calcite-list> `,
    );
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getFocusedElementProp(page, "id")).toBe("item1");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getFocusedElementProp(page, "id")).toBe("action1");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getFocusedElementProp(page, "id")).toBe("action2");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getFocusedElementProp(page, "id")).toBe("action3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getFocusedElementProp(page, "id")).toBe("action4");
  });

  it("should navigate after focusing within a cell", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-list drag-enabled>
        <calcite-list-item id="one" value="one" label="One" description="hello world"> </calcite-list-item>
        <calcite-list-item id="two" value="two" label="Two" description="hello world"> </calcite-list-item>
        <calcite-list-item id="three" value="three" label="Three" description="hello world"></calcite-list-item>
      </calcite-list>
    `);
    await page.waitForChanges();
    const items = await findAll(page, "calcite-list-item");
    const secondHandleCell = await page.find(`#two >>> .${ListItemCSS.dragContainer}`);

    expect(await items[0].getProperty("active")).toBe(true);
    expect(await items[1].getProperty("active")).toBe(false);
    expect(await items[2].getProperty("active")).toBe(false);
    expect(secondHandleCell.getAttribute(activeCellTestAttribute)).toBe(null);

    const secondDragHandle = await page.find("#two >>> calcite-sort-handle");

    await secondDragHandle.click();

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(await items[0].getProperty("active")).toBe(false);
    expect(await items[1].getProperty("active")).toBe(true);
    expect(await items[2].getProperty("active")).toBe(false);
    expect(secondHandleCell.getAttribute(activeCellTestAttribute)).toBe(null);
  });
});
