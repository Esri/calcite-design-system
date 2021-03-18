import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSEvalable } from "puppeteer";
import { html } from "../../tests/utils";
import { CSS as PICK_LIST_ITEM_CSS } from "../calcite-pick-list-item/resources";
import { focusable } from "../../tests/commonTests";

type ListType = "pick" | "value";
type ListElement = HTMLCalcitePickListElement | HTMLCalciteValueListElement;

export function keyboardNavigation(listType: ListType): void {
  const getFocusedItemValue = (page: E2EPage): ReturnType<JSEvalable["evaluate"]> =>
    page.evaluate(
      () => (document.activeElement as HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement).value
    );

  describe("multi selection", () => {
    it("can be navigated with up/down arrow keys", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-${listType}-list multiple>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `
      });
      const list = await page.find(`calcite-${listType}-list`);
      await list.callMethod("setFocus");

      expect(await getFocusedItemValue(page)).toEqual("one");

      await list.press("ArrowDown");

      expect(await getFocusedItemValue(page)).toEqual("two");

      await list.press("ArrowDown");

      expect(await getFocusedItemValue(page)).toEqual("one");

      await list.press("ArrowUp");

      expect(await getFocusedItemValue(page)).toEqual("two");

      await list.press("ArrowUp");

      expect(await getFocusedItemValue(page)).toEqual("one");
    });
  });

  describe("single selection", () => {
    describe("with selected item", () => {
      it("can be navigated with up/down arrow keys", async () => {
        const page = await newE2EPage({
          html: `
        <calcite-${listType}-list>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two" selected></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `
        });
        const list = await page.find(`calcite-${listType}-list`);
        await list.callMethod("setFocus");

        expect(await getFocusedItemValue(page)).toEqual("two");

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("one");

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("two");

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("one");

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("two");
      });
    });

    describe("no selected item", () => {
      it("can be navigated with up/down arrow keys", async () => {
        const page = await newE2EPage({
          html: `
        <calcite-${listType}-list>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `
        });
        const list = await page.find(`calcite-${listType}-list`);
        await list.callMethod("setFocus");

        expect(await getFocusedItemValue(page)).toEqual("one");

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("two");

        await list.press("ArrowDown");

        expect(await getFocusedItemValue(page)).toEqual("one");

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("two");

        await list.press("ArrowUp");

        expect(await getFocusedItemValue(page)).toEqual("one");
      });
    });

    it("navigating items after filtering", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-${listType}-list filter-enabled>
          <calcite-${listType}-list-item value="one" label="One" selected></calcite-${listType}-list-item>
          <calcite-${listType}-list-item value="two" label="Two"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `
      });
      const filter = await page.find(`calcite-${listType}-list >>> calcite-filter`);
      await filter.callMethod("setFocus");

      await page.keyboard.type("one");
      await page.waitForEvent("calciteFilterChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      expect(await getFocusedItemValue(page)).toEqual("one");

      await filter.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      await page.keyboard.type("two");
      await page.waitForEvent("calciteFilterChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      expect(await getFocusedItemValue(page)).toEqual("two");
    });
  });
}

export function selectionAndDeselection(listType: ListType): void {
  describe("when multiple is false and a item is clicked", () => {
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
          hasItem: detail.has("example")
        };
      });
      const properties = await eventDetail.getProperties();
      expect(eventDetail).toBeDefined();
      expect(properties.get("size")._remoteObject.value).toBe(1);
      expect(properties.get("hasItem")._remoteObject.value).toBe(true);
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
          one: result.has("one")
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
  let item1Visible;
  let item2Visible;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<calcite-${listType}-list filter-enabled>
        <calcite-${listType}-list-item value="1" label="One" description="uno"></calcite-${listType}-list-item>
        <calcite-${listType}-list-item value="2" label="Two" description="dos"></calcite-${listType}-list-item>
      </calcite-${listType}-list>`);
    item1 = await page.find(`calcite-${listType}-list-item[value="1"]`);
    item2 = await page.find(`calcite-${listType}-list-item[value="2"]`);
    item1.setProperty("metadata", { category: "first" });
    item2.setProperty("metadata", { category: "second" });
    await page.waitForChanges();
    await page.evaluate((listType) => {
      (window as any).filter = document
        .querySelector(`calcite-${listType}-list`)
        .shadowRoot.querySelector("calcite-filter");
      const filter = (window as any).filter;
      (window as any).filterInput = filter.shadowRoot.querySelector("input");
    }, listType);
  });

  it("should match text in the label prop", async () => {
    // Match first item
    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "one";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item2.waitForNotVisible();

    item1Visible = await item1.isVisible();
    item2Visible = await item2.isVisible();

    expect(item1Visible).toBe(true);
    expect(item2Visible).toBe(false);

    // Match second item
    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "two";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item1.waitForNotVisible();

    item1Visible = await item1.isVisible();
    item2Visible = await item2.isVisible();
    expect(item1Visible).toBe(false);
    expect(item2Visible).toBe(true);
  });

  it("should match text in the description prop", async () => {
    // Match first item
    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "uno";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item2.waitForNotVisible();

    item1Visible = await item1.isVisible();
    item2Visible = await item2.isVisible();

    expect(item1Visible).toBe(true);
    expect(item2Visible).toBe(false);

    // Match second item
    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "dos";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item1.waitForNotVisible();

    item1Visible = await item1.isVisible();
    item2Visible = await item2.isVisible();
    expect(item1Visible).toBe(false);
    expect(item2Visible).toBe(true);
  });

  it("should match text in the metadata prop", async () => {
    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "first";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item2.waitForNotVisible();

    let item1Visible = await item1.isVisible();
    let item2Visible = await item2.isVisible();
    expect(item1Visible).toBe(true);
    expect(item2Visible).toBe(false);

    await page.evaluate(() => {
      const filterInput = (window as any).filterInput;
      filterInput.value = "second";
      filterInput.dispatchEvent(new Event("input"));
    });
    await item1.waitForNotVisible();

    item1Visible = await item1.isVisible();
    item2Visible = await item2.isVisible();
    expect(item1Visible).toBe(false);
    expect(item2Visible).toBe(true);
  });
}

export function disabledStates(listType: ListType): void {
  it("disabled", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-${listType}-list disabled>
          <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `
    });

    const list = await page.find(`calcite-${listType}-list`);
    const item1 = await list.find("[value=one]");
    const toggleSpy = await list.spyOnEvent("calciteListChange");

    await item1.click();
    expect(toggleSpy).toHaveReceivedEventTimes(0);
  });

  it("loading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-${listType}-list loading>
        <calcite-${listType}-list-item value="one" label="One"></calcite-${listType}-list-item>
      </calcite-${listType}-list>`);

    const list = await page.find(`calcite-${listType}-list`);
    const item1 = await list.find("[value=one]");
    const toggleSpy = await list.spyOnEvent("calciteListChange");

    await item1.click();
    expect(toggleSpy).toHaveReceivedEventTimes(0);
  });
}

export function itemRemoval(listType: ListType): void {
  it("handles removing items", async () => {
    const page = await newE2EPage({
      html: html`
      <calcite-${listType}-list>
        <calcite-${listType}-list-item value="remove-me" label="Remove me!" removable></calcite-${listType}-list-item>
      </calcite-${listType}-list>
    `
    });
    const list = await page.find(`calcite-${listType}-list`);
    const removeItemSpy = await list.spyOnEvent("calciteListItemRemove");
    const listChangeSpy = await list.spyOnEvent("calciteListChange");

    await page.$eval(
      `calcite-${listType}-list-item`,
      (item: ListElement, listType, selector) => {
        listType === "pick"
          ? item.shadowRoot.querySelector<HTMLElement>(selector).click()
          : item.shadowRoot
              .querySelector<ListElement>("calcite-pick-list-item")
              .shadowRoot.querySelector<HTMLElement>(selector)
              .click();
      },
      listType,
      `.${PICK_LIST_ITEM_CSS.remove}`
    );

    await page.waitForChanges();

    expect(await page.find(`calcite-${listType}-list-item`)).toBeNull();
    expect(removeItemSpy).toHaveReceivedEventTimes(1);
    expect(listChangeSpy).toHaveReceivedEventTimes(1);
  });
}

export function focusing(listType: ListType): void {
  describe("when setFocus method is called", () => {
    it("should focus filter", () =>
      focusable(
        html`
        <calcite-${listType}-list filter-enabled>
          <calcite-${listType}-list-item label="Sample" value="one"></calcite-${listType}-list-item>
        </calcite-${listType}-list>
      `,
        {
          focusId: "filter",
          shadowFocusTargetSelector: "calcite-filter"
        }
      ));
  });
}
