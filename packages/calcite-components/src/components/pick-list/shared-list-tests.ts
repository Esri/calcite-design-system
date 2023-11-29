import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { disabled, focusable } from "../../tests/commonTests";
import { selectText } from "../../tests/utils";
import { CSS as PICK_LIST_ITEM_CSS } from "../pick-list-item/resources";

type ListType = "pick" | "value";
type ListElement = HTMLCalcitePickListElement | HTMLCalciteValueListElement;

export function keyboardNavigation(listType: ListType): void {
  const getFocusedItemValue = (page: E2EPage): ReturnType<E2EPage["evaluate"]> =>
    page.evaluate(
      () => (document.activeElement as HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement)?.value ?? null
    );

  async function getSelectedItemValues(list: E2EElement, listType: string): Promise<string[]> {
    return Promise.all(
      (await list.findAll(`calcite-${listType}-list-item[selected]`)).map((el) => el.getProperty("value"))
    );
  }

  describe("multi selection", () => {
    it("keyboard interaction", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-${listType}-list multiple>
          <calcite-${listType}-list-item disabled value="zero" label="Zero (disabled)"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item disabled value="three" label="Three (disabled)"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
      });
      const list = await page.find(`calcite-${listType}-list`);
      await list.callMethod("setFocus");
      await page.waitForChanges();

      expect(await getFocusedItemValue(page)).toEqual("one");
      expect(await getSelectedItemValues(list, listType)).toEqual([]);

      await list.press("ArrowDown");
      await page.waitForChanges();

      expect(await getFocusedItemValue(page)).toEqual("two");

      await list.press(" ");
      await page.waitForChanges();

      expect(await getSelectedItemValues(list, listType)).toEqual(["two"]);

      await list.press("ArrowDown");
      await page.waitForChanges();

      expect(await getFocusedItemValue(page)).toEqual("one");

      await list.press(" ");
      await page.waitForChanges();
      expect(await getSelectedItemValues(list, listType)).toEqual(["one", "two"]);

      await list.press("ArrowUp");
      await page.waitForChanges();

      expect(await getFocusedItemValue(page)).toEqual("two");

      await list.press(" ");
      await page.waitForChanges();
      expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);

      await list.press("ArrowUp");
      await page.waitForChanges();

      expect(await getFocusedItemValue(page)).toEqual("one");

      await list.press(" ");
      await page.waitForChanges();
      expect(await getSelectedItemValues(list, listType)).toEqual([]);
    });
  });

  describe("single selection", () => {
    describe("with selected item", () => {
      it("keyboard interaction", async () => {
        const page = await newE2EPage({
          html: `
        <calcite-${listType}-list>
          <calcite-${listType}-list-item id="one" value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item id="two" value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
        });
        const list = await page.find(`calcite-${listType}-list`);
        const firstItem = await page.find("#one");
        const secondItem = await page.find("#two");
        await list.callMethod("setFocus");
        await page.waitForChanges();

        expect(await getSelectedItemValues(list, listType)).toEqual([]);

        expect(await getFocusedItemValue(page)).toEqual("one");
        expect(await getSelectedItemValues(list, listType)).toEqual([]);
        expect(firstItem.tabIndex).toBe(-1);
        expect(secondItem.tabIndex).toBe(-1);

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("two");
        expect(firstItem.tabIndex).toBe(-1);
        expect(secondItem.tabIndex).toBe(-1);

        await list.press(" ");
        expect(await getSelectedItemValues(list, listType)).toEqual(["two"]);

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("one");
        expect(firstItem.tabIndex).toBe(-1);
        expect(firstItem.tabIndex).toBe(-1);

        await list.press(" ");
        expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("two");
        expect(firstItem.tabIndex).toBe(-1);
        expect(secondItem.tabIndex).toBe(-1);

        await list.press(" ");
        expect(await getSelectedItemValues(list, listType)).toEqual(["two"]);

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("one");

        await list.press(" ");
        expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);
      });

      it("keyboard interaction + selectionFollowsFocus", async () => {
        const page = await newE2EPage({
          html: `
        <calcite-${listType}-list selection-follows-focus>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
        });
        const list = await page.find(`calcite-${listType}-list`);

        expect(await getFocusedItemValue(page)).toBeNull();
        expect(await getSelectedItemValues(list, listType)).toEqual([]);

        await list.callMethod("setFocus");
        await page.waitForChanges();

        expect(await getFocusedItemValue(page)).toEqual("one");
        expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("two");
        expect(await getSelectedItemValues(list, listType)).toEqual(["two"]);

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("one");
        expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("two");
        expect(await getSelectedItemValues(list, listType)).toEqual(["two"]);

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("one");
        expect(await getSelectedItemValues(list, listType)).toEqual(["one"]);
      });
    });

    it.skip("should honor filterText", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-${listType}-list filter-enabled filter-text="one">
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
      });
      const list = await page.find(`calcite-${listType}-list`);
      expect(await list.getProperty("filteredItems")).toHaveLength(1);
      expect(await list.getProperty("filteredData")).toHaveLength(1);
      expect(await list.getProperty("filterText")).toBe("one");
    });

    it.skip("navigating items after filtering", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-${listType}-list filter-enabled>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
      });
      const list = await page.find(`calcite-${listType}-list`);
      expect(await list.getProperty("filteredItems")).toHaveLength(2);
      expect(await list.getProperty("filteredData")).toHaveLength(2);
      expect(await list.getProperty("filterText")).toBe(undefined);
      const filter = await page.find(`calcite-${listType}-list >>> calcite-filter`);
      await filter.callMethod("setFocus");
      await page.waitForChanges();

      const calciteFilterChangeEvent = filter.waitForEvent("calciteFilterChange");
      const calciteListFilterEvent = page.waitForEvent("calciteListFilter");
      await page.keyboard.type("one");
      await calciteFilterChangeEvent;
      await calciteListFilterEvent;
      expect(await list.getProperty("filteredItems")).toHaveLength(1);
      expect(await list.getProperty("filteredData")).toHaveLength(1);
      expect(await list.getProperty("filterText")).toBe("one");

      await page.keyboard.press("Tab");
      expect(await getFocusedItemValue(page)).toEqual("one");

      await filter.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      const calciteFilterChangeEvent2 = filter.waitForEvent("calciteFilterChange");
      const calciteListFilterEvent2 = page.waitForEvent("calciteListFilter");
      await page.keyboard.type("two");
      await calciteFilterChangeEvent2;
      await calciteListFilterEvent2;
      expect(await list.getProperty("filteredItems")).toHaveLength(1);
      expect(await list.getProperty("filteredData")).toHaveLength(1);
      expect(await list.getProperty("filterText")).toBe("two");

      await page.keyboard.press("Tab");
      expect(await getFocusedItemValue(page)).toEqual("two");

      await filter.callMethod("setFocus");
      await page.waitForChanges();

      const calciteFilterChangeEvent3 = filter.waitForEvent("calciteFilterChange");
      const calciteListFilterEvent3 = page.waitForEvent("calciteListFilter");
      await page.keyboard.type("blah");
      await calciteFilterChangeEvent3;
      await calciteListFilterEvent3;
      expect(await list.getProperty("filteredItems")).toHaveLength(0);
      expect(await list.getProperty("filteredData")).toHaveLength(0);
      expect(await list.getProperty("filterText")).toBe("twoblah");
    });

    it("resets tabindex to selected item when focusing out of list", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-${listType}-list>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      expect(await getFocusedItemValue(page)).toEqual(null);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      expect(await getFocusedItemValue(page)).toEqual("one");
    });
  });
}

export function selectionAndDeselection(listType: ListType): void {
  describe("when multiple is false and an item is clicked", () => {
    it("should emit an event with the last selected item data", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const list = await page.find(`calcite-${listType}-list`);
      const item1 = await list.find("[value=one]");
      const item2 = await list.find("[value=two]");
      const toggleSpy = await list.spyOnEvent("calciteListChange");

      await item1.click();
      await item2.click();
      expect(toggleSpy).toHaveReceivedEventTimes(2);
    });
  });

  describe("when multiple is true and a item is clicked", () => {
    it("should emit an event with each selected item's data", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const list = await page.find(`calcite-${listType}-list`);
      const item1 = await list.find("[value=one]");
      const item2 = await list.find("[value=two]");
      const toggleSpy = await list.spyOnEvent("calciteListChange");

      await item1.click();
      await item2.click();
      await item2.click(); // deselect
      expect(toggleSpy).toHaveReceivedEventTimes(3);
    });
  });

  describe("preselected items", () => {
    it("should be included in the list of selected items", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const numSelected = await page.evaluate(async (listType) => {
        const list: ListElement = document.querySelector(`calcite-${listType}-list`);

        return (await list.getSelectedItems()).size;
      }, listType);

      expect(numSelected).toBe(1);
    });
  });

  describe("shift click behavior", () => {
    it("should multi-select", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="three" label="Three"></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const list = await page.find(`calcite-${listType}-list`);
      const item1 = await list.find("[value=one]");
      const item3 = await list.find("[value=three]");

      await item1.click();
      await page.keyboard.down("Shift");
      await item3.click();
      await page.keyboard.up("Shift");

      const numSelected = await page.evaluate(async (listType) => {
        const list: ListElement = document.querySelector(`calcite-${listType}-list`);
        return (await list.getSelectedItems()).size;
      }, listType);

      expect(numSelected).toBe(3);
    });

    it("should multi de-select", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="three" label="Three" selected></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const list = await page.find(`calcite-${listType}-list`);
      const item1 = await list.find("[value=one]");
      const item3 = await list.find("[value=three]");

      await item1.click();
      await page.keyboard.down("Shift");
      await item3.click();
      await page.keyboard.up("Shift");

      const numSelected = await page.evaluate(async (type) => {
        const domList: ListElement = document.querySelector(`calcite-${type}-list`);
        return (await domList.getSelectedItems()).size;
      }, listType);
      expect(numSelected).toBe(0);
    });
  });

  describe("calciteListChange event", () => {
    it("should fire event when a selection changed", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-${listType}-list>
          <calcite-${listType}-list-item label="test" value="example"></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);
      const item = await page.find(`calcite-${listType}-list-item`);
      await page.evaluate(() => {
        document.addEventListener("calciteListChange", (event: CustomEvent): void => {
          (window as any).eventDetail = event.detail;
        });
      });

      await item.click();

      await page.waitForChanges();

      const eventDetail: any = await page.evaluateHandle(() => {
        const detail = (window as any).eventDetail;
        return {
          size: detail.size,
          hasItem: detail.has("example"),
        };
      });
      const properties = await eventDetail.getProperties();
      expect(eventDetail).toBeDefined();
      expect(properties.get("size").remoteObject().value).toBe(1);
      expect(properties.get("hasItem").remoteObject().value).toBe(true);
    });
  });

  describe("when an item is selected and then gets removed", () => {
    it("should deselect the removed item from the selectedValues map", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item id="item2" value="two" label="Two" selected></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const numSelected = await page.evaluate(async (type) => {
        document.querySelector("#item2").remove();
        const domList: ListElement = document.querySelector(`calcite-${type}-list`);
        return (await domList.getSelectedItems()).size;
      }, listType);

      expect(numSelected).toBe(0);
    });
  });

  describe("value changes after item is selected", () => {
    it("should update the value in selectedValues map", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-${listType}-list>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="three" label="Three" selected></calcite-${listType}-list-item>
        </calcite-${listType}-list>`);

      const list = await page.find(`calcite-${listType}-list`);
      const item1 = await list.find("[value=one]");
      await item1.click();

      const hasValueOne = await page.evaluate(async (type) => {
        const pageList: ListElement = document.querySelector(`calcite-${type}-list`);
        return (await pageList.getSelectedItems()).has("one");
      }, listType);

      expect(hasValueOne).toBe(true);

      item1.setProperty("value", "four");
      await page.waitForChanges();

      const hasValues = await page.evaluate(async (type) => {
        const pageList: ListElement = document.querySelector(`calcite-${type}-list`);
        const result = await pageList.getSelectedItems();

        return {
          four: result.has("four"),
          one: result.has("one"),
        };
      }, listType);

      expect(hasValues.one).toBe(false);
      expect(hasValues.four).toBe(true);
    });
  });
}

export function filterBehavior(listType: ListType): void {
  let page: E2EPage = null;
  let item1: E2EElement;
  let item2: E2EElement;
  let filter: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<calcite-${listType}-list filter-enabled>
        <calcite-${listType}-list-item value="1" label="One" description="uno"></calcite-${listType}-list-item>
        <calcite-${listType}-list-item value="2" label="Two [regex chars]" description="dos (regex chars)"></calcite-${listType}-list-item>
      </calcite-${listType}-list>`);
    item1 = await page.find(`calcite-${listType}-list-item[value="1"]`);
    item2 = await page.find(`calcite-${listType}-list-item[value="2"]`);
    filter = await page.find(`calcite-${listType}-list >>> calcite-filter`);
    item1.setProperty("metadata", { category: "first" });
    item2.setProperty("metadata", { category: "second /regex chars/" });
    await page.waitForChanges();
  });

  it("should match text in the label prop", async () => {
    // Match first item
    await selectText(filter);
    await filter.type("one");
    await item2.waitForNotVisible();

    expect(await item1.isVisible()).toBe(true);
    expect(await item2.isVisible()).toBe(false);

    // Match second item (with regex chars)
    await selectText(filter);
    await filter.type("two [");
    await item1.waitForNotVisible();

    expect(await item1.isVisible()).toBe(false);
    expect(await item2.isVisible()).toBe(true);
  });

  it("should match text in the description prop", async () => {
    // Match first item
    await selectText(filter);
    await filter.type("uno");
    await item2.waitForNotVisible();

    expect(await item1.isVisible()).toBe(true);
    expect(await item2.isVisible()).toBe(false);

    // Match second item (with regex chars)
    await selectText(filter);
    await filter.type("dos (");
    await item1.waitForNotVisible();

    expect(await item1.isVisible()).toBe(false);
    expect(await item2.isVisible()).toBe(true);
  });

  it("should match text in the metadata prop", async () => {
    // Match first item
    await selectText(filter);
    await filter.type("first");
    await item2.waitForNotVisible();

    expect(await item1.isVisible()).toBe(true);
    expect(await item2.isVisible()).toBe(false);

    // Match second item (with regex chars)
    await selectText(filter);
    await filter.type("second /");
    await item1.waitForNotVisible();

    expect(await item1.isVisible()).toBe(false);
    expect(await item2.isVisible()).toBe(true);
  });
}

export function itemRemoval(listType: ListType): void {
  const pickListGroupHtml = html` <calcite-pick-list-group
      label="Will be removed when slotted 'parent item' is removed"
      value="remove-me"
    >
      <calcite-pick-list-item
        slot="parent-item"
        value="remove-me"
        label="Remove me!"
        removable
      ></calcite-pick-list-item>
    </calcite-pick-list-group>
    <calcite-pick-list-group label="Will not be removed when child item is removed" value="do-not-remove-me">
      <calcite-pick-list-item value="remove-me" label="Do not remove me!" removable></calcite-pick-list-item>
    </calcite-pick-list-group>`;

  it("handles removing items", async () => {
    const page = await newE2EPage({
      html: html`
      <calcite-${listType}-list>
        ${listType === "value" ? "" : pickListGroupHtml}
        <calcite-${listType}-list-item value="remove-me" label="Remove me!" removable></calcite-${listType}-list-item>
      </calcite-${listType}-list>
    `,
    });
    const list = await page.find(`calcite-${listType}-list`);
    const removeItemSpy = await list.spyOnEvent("calciteListItemRemove");
    const listChangeSpy = await list.spyOnEvent("calciteListChange");

    const removableItems = await page.$$eval(
      `calcite-${listType}-list-item`,
      (items, listType, selector: string) => {
        items.forEach((item) => {
          listType === "pick"
            ? item.shadowRoot.querySelector<HTMLElement>(selector).click()
            : item.shadowRoot
                .querySelector<HTMLCalcitePickListItemElement>("calcite-pick-list-item")
                .shadowRoot.querySelector<HTMLElement>(selector)
                .click();
        });

        return items;
      },
      listType,
      `.${PICK_LIST_ITEM_CSS.remove}`
    );

    await page.waitForChanges();

    expect(await page.findAll(`calcite-${listType}-list-item`)).toHaveLength(0);
    expect(await page.findAll(`calcite-pick-list-group`)).toHaveLength(listType === "pick" ? 1 : 0);
    expect(removeItemSpy).toHaveReceivedEventTimes(removableItems.length);
    expect(listChangeSpy).toHaveReceivedEventTimes(1);
  });
}

// eslint-disable-next-line jest/no-export -- util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks */
export function focusing(listType: ListType): void {
  describe("should focus filter when setFocus method is called", () => {
    focusable(
      html`
        <calcite-${listType}-list filter-enabled>
          <calcite-${listType}-list-item label="Sample" value="one"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
      {
        focusId: "filter",
        shadowFocusTargetSelector: "calcite-filter",
      }
    );
  });
}

/* eslint-disable-next-line jest/no-export  -- util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks */
export function disabling(listType: ListType): void {
  describe("disabled", () => {
    disabled(
      html`
      <calcite-${listType}-list>
        <calcite-${listType}-list-item label="Sample" value="one"></calcite-${listType}-list-item>
      </calcite-${listType}-list>
    `,
      {
        focusTarget: "child",
      }
    );
  });
}
