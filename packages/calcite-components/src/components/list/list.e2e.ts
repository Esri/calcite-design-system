import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  hidden,
  renders,
  focusable,
  disabled,
  defaults,
  t9n,
  themed,
  reflects,
} from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { CSS as ListItemCSS, activeCellTestAttribute } from "../list-item/resources";
import {
  GlobalTestProps,
  dragAndDrop,
  isElementFocused,
  getFocusedElementProp,
  newProgrammaticE2EPage,
} from "../../tests/utils";
import { DEBOUNCE } from "../../utils/resources";
import { Reorder } from "../sort-handle/interfaces";
import type { ListItem } from "../list-item/list-item";
import { ListDragDetail } from "./interfaces";
import { CSS } from "./resources";
import type { List } from "./list";

const placeholder = placeholderImage({
  width: 140,
  height: 100,
});

describe("calcite-list", () => {
  describe("defaults", () => {
    defaults("calcite-list", [
      {
        propertyName: "disabled",
        defaultValue: false,
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
        propertyName: "selectionMode",
        defaultValue: "none",
      },
      {
        propertyName: "interactionMode",
        defaultValue: "interactive",
      },
      {
        propertyName: "selectedItems",
        defaultValue: [],
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "icon",
      },
      {
        propertyName: "filterEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filteredData",
        defaultValue: [],
      },
      {
        propertyName: "filteredItems",
        defaultValue: [],
      },
      {
        propertyName: "filterText",
        defaultValue: undefined,
      },
      {
        propertyName: "filterPlaceholder",
        defaultValue: undefined,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filterProps",
        defaultValue: undefined,
      },
      {
        propertyName: "displayMode",
        defaultValue: "flat",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-list", [
      {
        propertyName: "displayMode",
        value: "nested",
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-list", { display: "block" });
  });

  describe("is focusable", () => {
    focusable(
      html`<calcite-list>
        <calcite-list-item active label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      {
        focusTargetSelector: "calcite-list-item",
      },
    );
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list");
  });

  describe("translation support", () => {
    t9n("calcite-list");
  });

  describe("accessible", () => {
    accessible(
      html`<calcite-list>
        <calcite-list-item label="candy" description="kingdom">
          <calcite-action icon="banana" label="finn" slot="actions-start" />
          <calcite-icon icon="banana" slot="content-start" />
          <img slot="content-start" src="${placeholder}" alt="Test image" />
          <calcite-icon icon="banana" slot="content-end" />
          <calcite-action icon="banana" label="jake" slot="actions-end" />
        </calcite-list-item>
        <calcite-list-item label="test" non-interactive description="hello world"></calcite-list-item>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
    );
    accessible(
      html`<calcite-list filter-enabled filter-text="Bananas" selection-appearance="border" selection-mode="single">
        <calcite-list-item label="Apples" value="apples"></calcite-list-item>
        <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>
        <calcite-list-item label="Pears" value="pears"></calcite-list-item>
        <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
          <div slot="title">No fruits found</div>
          <div slot="message">Try a different fruit?</div>
        </calcite-notice>
      </calcite-list>`,
    );
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      { focusTarget: "child" },
    );
  });

  it("honors filterLabel property", async () => {
    const page = await newE2EPage();
    const label = "hello world";
    await page.setContent(`<calcite-list filter-enabled filter-label="${label}"></calcite-list>`);

    const filter = await page.find(`calcite-list >>> calcite-filter`);
    expect(await filter.getProperty("label")).toBe(label);
  });

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

    const items = await page.findAll("calcite-list-item");

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

    const items = await page.findAll("calcite-list-item");

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

    const items = await page.findAll("calcite-list-item");

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

    const items = await page.findAll("calcite-list-item");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("m");
    }

    const rootList = await page.find("#root");
    rootList.setProperty("scale", "s");

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("s");
    }

    rootList.setProperty("scale", "m");

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("m");
    }

    rootList.setProperty("scale", "l");

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("l");
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

    const [firstItem, secondItem] = await page.findAll("calcite-list-item");

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
    it("navigating items after filtering", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-list filter-enabled>
          <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
          <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
        </calcite-list>
      `);
      await page.waitForChanges();
      const list = await page.find("calcite-list");
      const eventSpy = await list.spyOnEvent("calciteListChange");
      const filter = await page.find(`calcite-list >>> calcite-filter`);
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(await list.getProperty("filteredItems")).toHaveLength(2);
      expect(await list.getProperty("filteredData")).toHaveLength(2);
      expect(await list.getProperty("filterText")).toBeUndefined();

      await filter.callMethod("setFocus");
      await page.waitForChanges();

      const calciteListFilterEvent = list.waitForEvent("calciteListFilter");
      await page.keyboard.type("one");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      await calciteListFilterEvent;
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await list.getProperty("filteredItems")).toHaveLength(1);
      expect(await list.getProperty("filteredData")).toHaveLength(1);
      expect(await list.getProperty("filterText")).toBe("one");

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      const calciteListFilterEvent2 = list.waitForEvent("calciteListFilter");
      await page.keyboard.type("two");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      await calciteListFilterEvent2;
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await list.getProperty("filteredItems")).toHaveLength(1);
      expect(await list.getProperty("filteredData")).toHaveLength(1);
      expect(await list.getProperty("filterText")).toBe("two");

      const calciteListFilterEvent3 = list.waitForEvent("calciteListFilter");
      await page.keyboard.type(" blah");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      await calciteListFilterEvent3;
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await list.getProperty("filteredItems")).toHaveLength(0);
      expect(await list.getProperty("filteredData")).toHaveLength(0);
      expect(await list.getProperty("filterText")).toBe("two blah");
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
      const listItems = await page.findAll("calcite-list-item");
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(await list.getProperty("filteredItems")).toHaveLength(3);
      expect(await list.getProperty("filteredData")).toHaveLength(3);
      expect(await list.getProperty("filterText")).toBeUndefined();

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
      let visibleItems = await page.findAll("calcite-list-item:not([filter-hidden])");

      expect(visibleItems).toHaveLength(3);
      for (const item of visibleItems) {
        expect(await item.getProperty("description")).toBe("list1");
      }

      list.setProperty("filterText", matchingFont);
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      visibleItems = await page.findAll("calcite-list-item:not([filter-hidden])");
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
      visibleItems = await page.findAll("calcite-list-item:not([filter-hidden])");

      expect(visibleItems).toHaveLength(2);
      for (const item of visibleItems) {
        expect(await item.getProperty("description")).toBe("list2");
      }
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

      const visibleItems = await page.findAll("calcite-list-item:not([filter-hidden])");

      expect(visibleItems.map((item) => item.id)).toEqual(["label-match", "description-match"]);
    });

    it("filters initially with filterProps", async () => {
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

      const visibleItems = await page.findAll("calcite-list-item:not([filter-hidden])");

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
    const clickItemContent = (item: ListItem["el"], selector: string) => {
      item.shadowRoot.querySelector(selector).dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
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
    const items = await page.findAll("calcite-list-item");

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
    const items = await page.findAll("calcite-list-item");

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

    const items = await page.findAll("calcite-list-item");

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

    const items = await page.findAll("calcite-list-item");

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

    const calciteListChangeEvent = list.waitForEvent("calciteListChange");
    await listItemOneContentContainer.click();
    await calciteListChangeEvent;

    expect(await listItemOne.getProperty("selected")).toBe(true);
    expect(await list.getProperty("selectedItems")).toHaveLength(1);

    const calciteListChangeEvent2 = list.waitForEvent("calciteListChange");
    await listItemOneContentContainer.click();
    await calciteListChangeEvent2;
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
            <calcite-action
              id="action1"
              slot="actions-start"
              icon="gear"
              text="Setup the trails layer"
            ></calcite-action>
            <calcite-action
              id="action2"
              slot="actions-start"
              icon="hammer"
              text="Troubleshoot the trails layer"
            ></calcite-action>
            <calcite-action
              id="action3"
              slot="actions-end"
              icon="bookmark"
              text="Bookmark trails layer"
            ></calcite-action>
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
      const items = await page.findAll("calcite-list-item");
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
      expect(secondHandleCell.getAttribute(activeCellTestAttribute)).toBe("");
    });
  });

  describe("drag and drop", () => {
    async function createSimpleList(): Promise<E2EPage> {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-list drag-enabled id="list1">
          <calcite-list-item id="one" value="one" label="One"></calcite-list-item>
          <calcite-list-item id="two" value="two" label="Two"></calcite-list-item>
          <calcite-list-item id="three" value="three" label="Three"></calcite-list-item>
        </calcite-list>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      return page;
    }

    type TestWindow = GlobalTestProps<{
      calledTimes: number;
      list1CalledTimes: number;
      list2CalledTimes: number;
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
      const page = await createSimpleList();

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("calcite-list", (list: List["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        testWindow.newIndex = -1;
        testWindow.oldIndex = -1;
        testWindow.startCalledTimes = 0;
        testWindow.endCalledTimes = 0;
        list.addEventListener("calciteListOrderChange", (event: CustomEvent<ListDragDetail>) => {
          testWindow.calledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
        });
        list.addEventListener("calciteListDragEnd", (event: CustomEvent<ListDragDetail>) => {
          testWindow.endCalledTimes++;
          testWindow.endNewIndex = event.detail.newIndex;
          testWindow.endOldIndex = event.detail.oldIndex;
        });
        list.addEventListener("calciteListDragStart", (event: CustomEvent<ListDragDetail>) => {
          testWindow.startCalledTimes++;
          testWindow.startNewIndex = event.detail.newIndex;
          testWindow.startOldIndex = event.detail.oldIndex;
        });
      });

      await dragAndDrop(
        page,
        {
          element: `calcite-list-item[value="one"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `calcite-list-item[value="two"]`,
          shadow: "calcite-sort-handle",
        },
      );

      const [first, second] = await page.findAll("calcite-list-item");
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

    it("supports dragging items between lists", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-list id="first-letters" drag-enabled group="letters">
          <calcite-list-item value="a" label="A"></calcite-list-item>
          <calcite-list-item value="b" label="B"></calcite-list-item>
        </calcite-list>

        <calcite-list id="numbers" drag-enabled group="numbers">
          <calcite-list-item value="1" label="One"></calcite-list-item>
          <calcite-list-item value="2" label="Two"></calcite-list-item>
        </calcite-list>

        <calcite-list id="no-group" drag-enabled>
          <calcite-list-item value="no-group" label="No group"></calcite-list-item>
        </calcite-list>

        <calcite-list id="second-letters" drag-enabled group="letters">
          <calcite-list-item value="c" label="C"></calcite-list-item>
          <calcite-list-item value="d" label="D"></calcite-list-item>
          <calcite-list-item value="e" label="E"></calcite-list-item>
          <calcite-list-item value="f" label="F"></calcite-list-item>
        </calcite-list>
      `);

      await page.waitForChanges();

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.evaluate(() => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        const lists = document.querySelectorAll("calcite-list");
        lists.forEach((list) =>
          list.addEventListener("calciteListOrderChange", () => {
            testWindow.calledTimes++;
          }),
        );
      });

      await dragAndDrop(
        page,
        {
          element: `calcite-list-item[value="d"]`,
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
          element: `calcite-list-item[value="e"]`,
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
          element: `calcite-list-item[value="e"]`,
          shadow: "calcite-sort-handle",
        },
        {
          element: `#no-group`,
          pointerPosition: {
            vertical: "bottom",
          },
        },
      );

      const [first, second, third, fourth, fifth, sixth, seventh, eight, ninth] =
        await page.findAll("calcite-list-item");
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
      const page = await createSimpleList();

      let totalMoves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("calcite-list", (list: List["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        list.addEventListener("calciteListOrderChange", (event: CustomEvent<ListDragDetail>) => {
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
          `calcite-list-item[value="one"]`,
          (item1: ListItem["el"], reorder, eventName) => {
            item1.dispatchEvent(new CustomEvent(eventName, { detail: { reorder }, bubbles: true }));
          },
          reorder,
          eventName,
        );
        await event;
        await page.waitForChanges();
        const itemsAfter = await page.findAll("calcite-list-item");
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
        html`<calcite-list id="list1" group="${group}" drag-enabled>
            <calcite-list-item id="one" value="one" label="One"></calcite-list-item>
            <calcite-list-item id="two" value="two" label="Two"></calcite-list-item>
          </calcite-list>
          <calcite-list id="list2" group="${group}" drag-enabled>
            <calcite-list-item id="three" value="three" label="Three"></calcite-list-item>
          </calcite-list>`,
      );
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      let list1Moves = 0;
      let list2Moves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("#list1", (list: List["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.list1CalledTimes = 0;
        list.addEventListener("calciteListOrderChange", (event: CustomEvent<ListDragDetail>) => {
          testWindow.list1CalledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
          testWindow.fromEl = event.detail.fromEl.id;
          testWindow.toEl = event.detail.toEl.id;
          testWindow.el = event.detail.dragEl.id;
        });
      });

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("#list2", (list: List["el"]) => {
        const testWindow = window as TestWindow;
        testWindow.list2CalledTimes = 0;
        list.addEventListener("calciteListOrderChange", (event: CustomEvent<ListDragDetail>) => {
          testWindow.list2CalledTimes++;
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
          (item: ListItem["el"], moveToListId, eventName) => {
            const element = document.querySelector<List["el"]>(`#${moveToListId}`);
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
        const list1After = await page.findAll(`#${list1Id} calcite-list-item`);
        expect(list1After.length).toBe(list1Order.length);

        for (let i = 0; i < list1After.length; i++) {
          expect(await list1After[i].getProperty("value")).toBe(list1Order[i]);
        }

        const list2After = await page.findAll(`#${list2Id} calcite-list-item`);
        expect(list2After.length).toBe(list2Order.length);

        for (let i = 0; i < list2After.length; i++) {
          expect(await list2After[i].getProperty("value")).toBe(list2Order[i]);
        }

        const results = await page.evaluate(() => {
          const testWindow = window as TestWindow;

          return {
            list1CalledTimes: testWindow.list1CalledTimes,
            list2CalledTimes: testWindow.list2CalledTimes,
            oldIndex: testWindow.oldIndex,
            newIndex: testWindow.newIndex,
            fromEl: testWindow.fromEl,
            toEl: testWindow.toEl,
            el: testWindow.el,
          };
        });

        expect(results.list1CalledTimes).toBe(moveFromListId === list1Id ? ++list1Moves : list1Moves);
        expect(results.list2CalledTimes).toBe(moveFromListId === list2Id ? ++list2Moves : list2Moves);
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

  describe("themed", () => {
    describe("default", () => {
      themed(html`calcite-list`, {
        "--calcite-list-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
      });
    });
  });
});
