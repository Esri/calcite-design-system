import { accessible, hidden, renders, focusable, disabled, defaults } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { newE2EPage } from "@stencil/core/testing";
import { debounceTimeout } from "./resources";
import { CSS } from "../list-item/resources";
import { DEBOUNCE_TIMEOUT as FILTER_DEBOUNCE_TIMEOUT } from "../filter/resources";

const placeholder = placeholderImage({
  width: 140,
  height: 100
});

const listDebounceTimeout = debounceTimeout + FILTER_DEBOUNCE_TIMEOUT;

describe("calcite-list", () => {
  describe("defaults", () => {
    defaults("calcite-list", [
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "label",
        defaultValue: undefined
      },
      {
        propertyName: "loading",
        defaultValue: false
      },
      {
        propertyName: "selectionMode",
        defaultValue: "none"
      },
      {
        propertyName: "selectedItems",
        defaultValue: []
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "icon"
      },
      {
        propertyName: "filterEnabled",
        defaultValue: false
      },
      {
        propertyName: "filteredData",
        defaultValue: []
      },
      {
        propertyName: "filteredItems",
        defaultValue: []
      },
      {
        propertyName: "filterText",
        defaultValue: undefined
      },
      {
        propertyName: "filterPlaceholder",
        defaultValue: undefined
      }
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
        focusTargetSelector: "calcite-list-item"
      }
    );
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list");
  });

  describe("accessible", () => {
    accessible(html`<calcite-list>
      <calcite-list-item label="candy" description="kingdom">
        <calcite-action icon="banana" label="finn" slot="actions-start" />
        <calcite-icon icon="banana" slot="content-start" />
        <img slot="content-start" src="${placeholder}" alt="Test image" />
        <calcite-icon icon="banana" slot="content-end" />
        <calcite-action icon="banana" label="jake" slot="actions-end" />
      </calcite-list-item>
      <calcite-list-item label="test" non-interactive description="hello world"></calcite-list-item>
      <calcite-list-item label="test" description="hello world"></calcite-list-item>
    </calcite-list>`);
  });

  it("can be disabled", () =>
    disabled(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      { focusTarget: "child" }
    ));

  it.skip("navigating items after filtering", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-list filter-enabled>
          <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
          <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
        </calcite-list>
      `
    });
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    const filter = await page.find(`calcite-list >>> calcite-filter`);
    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(2);
    expect(await list.getProperty("filterText")).toBeUndefined();

    await filter.callMethod("setFocus");

    const calciteListFilterEvent = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("one");
    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    await calciteListFilterEvent;
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("one");

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    const calciteListFilterEvent2 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("two");
    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    await calciteListFilterEvent2;
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("two");

    const calciteListFilterEvent3 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("blah");
    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    await calciteListFilterEvent3;
    expect(await list.getProperty("filteredItems")).toHaveLength(0);
    expect(await list.getProperty("filteredData")).toHaveLength(0);
    expect(await list.getProperty("filterText")).toBe("twoblah");
  });

  it.skip("filters initially", async () => {
    const page = await newE2EPage({
      html: html`
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
            id="value-match"
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
      `
    });

    const list = await page.find("calcite-list");
    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();

    expect(await list.getProperty("filteredData")).toHaveLength(3);
    expect(await list.getProperty("filteredItems")).toHaveLength(3);

    const visibleItems = await page.findAll("calcite-list-item:not([hidden])");

    expect(visibleItems.map((item) => item.id)).toEqual(["label-match", "description-match", "value-match"]);
  });

  it("should update active item on init and click", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list selection-mode="none">
        <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
        <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
        <calcite-list-item id="item-3" label="hello 3" description="world 3"></calcite-list-item>
      </calcite-list>`
    });

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();

    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("active")).toBe(true);
    expect(await items[1].getProperty("active")).toBe(false);
    expect(await items[2].getProperty("active")).toBe(false);

    const eventSpy = await page.spyOnEvent("calciteInternalListItemActive");

    await items[1].click();

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("active")).toBe(false);
    expect(await items[1].getProperty("active")).toBe(true);
    expect(await items[2].getProperty("active")).toBe(false);
  });

  it("should prevent de-selection of selected item in single-persist mode", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list selection-mode="single-persist">
        <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
        <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
        <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
      </calcite-list>`
    });

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();

    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await items[2].click();

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);
  });

  it("should correctly allow de-selection and change of selected item in single mode", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list selection-mode="single">
        <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
        <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
        <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
      </calcite-list>`
    });

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();

    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await items[2].click();

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);

    await items[0].click();

    await page.waitForTimeout(listDebounceTimeout);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);

    expect(await items[0].getProperty("selected")).toBe(true);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);
  });

  it("should emit calciteListChange on selection change", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-list selection-mode="single">
          <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
          <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
        </calcite-list>
      `
    });
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    const listItemOne = await page.find(`calcite-list-item[value=one]`);
    const listItemOneContentContainer = await page.find(`calcite-list-item[value=one] >>> .${CSS.contentContainer}`);

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
  });
});
