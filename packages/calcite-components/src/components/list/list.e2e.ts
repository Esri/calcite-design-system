import { accessible, hidden, renders, focusable, disabled, defaults, t9n } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { debounceTimeout } from "./resources";
import { CSS } from "../list-item/resources";
import { DEBOUNCE_TIMEOUT as FILTER_DEBOUNCE_TIMEOUT } from "../filter/resources";
import { GlobalTestProps, dragAndDrop, isElementFocused, getFocusedElementProp } from "../../tests/utils";
import { ListDragDetail } from "./interfaces";

const placeholder = placeholderImage({
  width: 140,
  height: 100,
});

const listDebounceTimeout = debounceTimeout + FILTER_DEBOUNCE_TIMEOUT;

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
      }
    );
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list");
  });

  describe.skip("translation support", () => {
    t9n("calcite-list");
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

  describe("disabled", () => {
    disabled(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      { focusTarget: "child" }
    );

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

      await secondItem.setProperty("disabled", true);
      await page.waitForChanges();
      await secondItem.setProperty("disabled", false);
      await page.waitForChanges();

      await firstItem.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      expect(await getFocusedElementProp(page, "id")).toBe("action-3");
    });
  });

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
    const filter = await page.find(`calcite-list >>> calcite-filter`);
    await page.waitForTimeout(listDebounceTimeout);
    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(2);
    expect(await list.getProperty("filterText")).toBeUndefined();

    await filter.callMethod("setFocus");
    await page.waitForChanges();

    const calciteListFilterEvent = list.waitForEvent("calciteListFilter");
    await page.keyboard.type("one");
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    await calciteListFilterEvent;
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
    await page.waitForTimeout(listDebounceTimeout);
    await calciteListFilterEvent2;
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("two");

    const calciteListFilterEvent3 = list.waitForEvent("calciteListFilter");
    await page.keyboard.type(" blah");
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    await calciteListFilterEvent3;
    expect(await list.getProperty("filteredItems")).toHaveLength(0);
    expect(await list.getProperty("filteredData")).toHaveLength(0);
    expect(await list.getProperty("filterText")).toBe("two blah");
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
    `);

    await page.waitForChanges();
    const list = await page.find("calcite-list");
    await page.waitForTimeout(listDebounceTimeout);

    expect(await list.getProperty("filteredItems")).toHaveLength(3);
    expect(await list.getProperty("filteredData")).toHaveLength(3);

    const visibleItems = await page.findAll("calcite-list-item:not([hidden])");

    expect(visibleItems.map((item) => item.id)).toEqual(["label-match", "description-match", "value-match"]);
  });

  it("should support shift click to select multiple items", async () => {
    const clickItemContent = (item: HTMLCalciteListItemElement, selector: string) => {
      item.shadowRoot.querySelector(selector).dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
    };

    const page = await newE2EPage();
    await page.setContent(html`<calcite-list selection-mode="multiple">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" label="hello 3" description="world 3"></calcite-list-item>
      <calcite-list-item id="item-4" label="hello 4" description="world 4"></calcite-list-item>
    </calcite-list>`);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);

    const list = await page.find("calcite-list");
    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);
    expect(await items[3].getProperty("selected")).toBe(false);

    const eventSpy = await list.spyOnEvent("calciteListChange");

    await items[0].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(await list.getProperty("selectedItems")).toHaveLength(1);

    expect(await items[0].getProperty("selected")).toBe(true);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);
    expect(await items[3].getProperty("selected")).toBe(false);

    await page.$eval("#item-4", clickItemContent, `.${CSS.contentContainer}`);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(await list.getProperty("selectedItems")).toHaveLength(4);

    expect(await items[0].getProperty("selected")).toBe(true);
    expect(await items[1].getProperty("selected")).toBe(true);
    expect(await items[2].getProperty("selected")).toBe(true);
    expect(await items[3].getProperty("selected")).toBe(true);

    await items[3].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(3);
    expect(await list.getProperty("selectedItems")).toHaveLength(3);

    expect(await items[0].getProperty("selected")).toBe(true);
    expect(await items[1].getProperty("selected")).toBe(true);
    expect(await items[2].getProperty("selected")).toBe(true);
    expect(await items[3].getProperty("selected")).toBe(false);

    await page.$eval("#item-1", clickItemContent, `.${CSS.contentContainer}`);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(4);
    expect(await list.getProperty("selectedItems")).toHaveLength(0);

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);
    expect(await items[3].getProperty("selected")).toBe(false);
  });

  it("should update active item on init and click", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-list selection-mode="none">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);

    const list = await page.find("calcite-list");
    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("active")).toBe(true);
    expect(await items[1].getProperty("active")).toBe(false);
    expect(await items[2].getProperty("active")).toBe(false);

    const eventSpy = await list.spyOnEvent("calciteInternalListItemActive");

    await items[1].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("active")).toBe(false);
    expect(await items[1].getProperty("active")).toBe(true);
    expect(await items[2].getProperty("active")).toBe(false);
  });

  it("should prevent de-selection of selected item in single-persist mode", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-list selection-mode="single-persist">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`);

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);

    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await items[2].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);
  });

  it("should correctly allow de-selection and change of selected item in single mode", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-list selection-mode="single">
      <calcite-list-item id="item-1" label="hello" description="world"></calcite-list-item>
      <calcite-list-item id="item-2" label="hello 2" description="world 2"></calcite-list-item>
      <calcite-list-item id="item-3" selected label="hello 3" description="world 3"></calcite-list-item>
    </calcite-list>`);

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);

    const items = await page.findAll("calcite-list-item");

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await items[2].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(eventSpy).toHaveReceivedEventTimes(1);

    expect(await items[0].getProperty("selected")).toBe(false);
    expect(await items[1].getProperty("selected")).toBe(false);
    expect(await items[2].getProperty("selected")).toBe(false);

    await items[0].click();

    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
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

    listItemOne.setProperty("selected", true);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
    expect(await listItemOne.getProperty("selected")).toBe(true);
    expect(await list.getProperty("selectedItems")).toHaveLength(1);

    listItemOne.setProperty("selected", false);
    await page.waitForChanges();
    await page.waitForTimeout(listDebounceTimeout);
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
      await page.waitForTimeout(listDebounceTimeout);
      expect(calciteListChange).toHaveReceivedEventTimes(0);

      await list.press("ArrowDown");

      expect(await isElementFocused(page, "#three")).toBe(true);

      const listItemFour = await page.find("#four");
      listItemFour.setProperty("closed", false);
      await page.waitForChanges();
      await page.waitForTimeout(listDebounceTimeout);
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
      await page.waitForTimeout(listDebounceTimeout);
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
        <calcite-list>
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

      expect(await isElementFocused(page, `.${CSS.contentContainer}`, { shadowed: true })).toBe(true);

      await list.press("ArrowRight");

      expect(await isElementFocused(page, "calcite-action")).toBe(true);

      await list.press("ArrowLeft");

      expect(await isElementFocused(page, `.${CSS.contentContainer}`, { shadowed: true })).toBe(true);

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
        <calcite-list drag-enabled>
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

      expect(await isElementFocused(page, `calcite-handle`, { shadowed: true })).toBe(true);

      await list.press("ArrowRight");

      expect(await isElementFocused(page, `.${CSS.contentContainer}`, { shadowed: true })).toBe(true);

      await list.press("ArrowRight");

      expect(await isElementFocused(page, "calcite-action")).toBe(true);

      await list.press("ArrowLeft");

      expect(await isElementFocused(page, `.${CSS.contentContainer}`, { shadowed: true })).toBe(true);

      await list.press("ArrowLeft");

      expect(await isElementFocused(page, `calcite-handle`, { shadowed: true })).toBe(true);

      await list.press("ArrowLeft");

      expect(await isElementFocused(page, "#one")).toBe(true);
      expect(await one.getProperty("open")).toBe(true);

      await list.press("ArrowLeft");

      expect(await isElementFocused(page, "#one")).toBe(true);
      expect(await one.getProperty("open")).toBe(false);
    });
  });

  describe("drag and drop", () => {
    async function createSimpleList(): Promise<E2EPage> {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-list drag-enabled>
        <calcite-list-item value="one" label="One"></calcite-list-item>
        <calcite-list-item value="two" label="Two"></calcite-list-item>
        <calcite-list-item value="three" label="Three"></calcite-list-item>
      </calcite-list>`);
      await page.waitForChanges();
      await page.waitForTimeout(listDebounceTimeout);
      return page;
    }

    type TestWindow = GlobalTestProps<{
      calledTimes: number;
      newIndex: number;
      oldIndex: number;
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
      await page.$eval("calcite-list", (list: HTMLCalciteListElement) => {
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
          shadow: "calcite-handle",
        },
        {
          element: `calcite-list-item[value="two"]`,
          shadow: "calcite-handle",
        }
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
          })
        );
      });

      await dragAndDrop(
        page,
        {
          element: `calcite-list-item[value="d"]`,
          shadow: "calcite-handle",
        },
        {
          element: `#first-letters`,
          pointerPosition: {
            vertical: "bottom",
          },
        }
      );

      await dragAndDrop(
        page,
        {
          element: `calcite-list-item[value="e"]`,
          shadow: "calcite-handle",
        },
        {
          element: `#numbers`,
          pointerPosition: {
            vertical: "bottom",
          },
        }
      );

      await dragAndDrop(
        page,
        {
          element: `calcite-list-item[value="e"]`,
          shadow: "calcite-handle",
        },
        {
          element: `#no-group`,
          pointerPosition: {
            vertical: "bottom",
          },
        }
      );

      const [first, second, third, fourth, fifth, sixth, seventh, eight, ninth] = await page.findAll(
        "calcite-list-item"
      );
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

    it("works using a keyboard", async () => {
      const page = await createSimpleList();

      const handle = await page.find(`calcite-list-item[value="one"] >>> calcite-handle`);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Space");
      expect(await handle.getProperty("activated")).toBe(true);
      await page.waitForChanges();

      let totalMoves = 0;

      // Workaround for page.spyOnEvent() failing due to drag event payload being serialized and there being circular JSON structures from the payload elements. See: https://github.com/Esri/calcite-design-system/issues/7643
      await page.$eval("calcite-list", (list: HTMLCalciteListElement) => {
        const testWindow = window as TestWindow;
        testWindow.calledTimes = 0;
        list.addEventListener("calciteListOrderChange", (event: CustomEvent<ListDragDetail>) => {
          testWindow.calledTimes++;
          testWindow.newIndex = event.detail.newIndex;
          testWindow.oldIndex = event.detail.oldIndex;
        });
      });

      async function assertKeyboardMove(
        arrowKey: "ArrowDown" | "ArrowUp",
        expectedValueOrder: string[],
        newIndex: number,
        oldIndex: number
      ): Promise<void> {
        await page.waitForChanges();
        await page.keyboard.press(arrowKey);
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
          };
        });

        expect(results.calledTimes).toBe(++totalMoves);
        expect(results.newIndex).toBe(newIndex);
        expect(results.oldIndex).toBe(oldIndex);
      }

      await assertKeyboardMove("ArrowDown", ["two", "one", "three"], 1, 0);
      await assertKeyboardMove("ArrowDown", ["two", "three", "one"], 2, 1);

      await assertKeyboardMove("ArrowUp", ["two", "one", "three"], 1, 2);
      await assertKeyboardMove("ArrowUp", ["one", "two", "three"], 0, 1);
    });

    it("is drag and drop list accessible", async () => {
      const page = await createSimpleList();
      let startIndex = 0;

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const items = await page.findAll("calcite-list-item");
      const item = await page.find('calcite-list-item[value="one"]');
      const handle = await page.find('calcite-list-item[value="one"] >>> calcite-handle');
      const assistiveTextElement = await page.find("calcite-list >>> .assistive-text");

      async function getAriaLabel(): Promise<string> {
        return page.$eval("calcite-list-item[value='one']", (el: HTMLCalciteListItemElement) => {
          return el.shadowRoot
            .querySelector("calcite-handle")
            .shadowRoot.querySelector("span")
            .getAttribute("aria-label");
        });
      }

      const handleAriaLabel = await getAriaLabel();
      const itemLabel = await item.getProperty("label");

      /* eslint-disable import/no-dynamic-require -- allowing dynamic asset path for maintainability */
      const langTranslations = await import(`../handle/assets/handle/t9n/messages.json`);
      /* eslint-enable import/no-dynamic-require */

      function messageSubstitute({
        text,
        setPosition,
        label,
        setSize,
      }: {
        text: string;
        setPosition: number;
        label: string;
        setSize: number;
      }): string {
        const replacePosition = text.replace("{position}", setPosition.toString());
        const replaceLabel = replacePosition.replace("{itemLabel}", label);
        return replaceLabel.replace("{total}", setSize.toString());
      }

      expect(handleAriaLabel).toBe(
        messageSubstitute({
          text: langTranslations.dragHandleIdle,
          setPosition: startIndex + 1,
          label: itemLabel,
          setSize: items.length,
        })
      );

      await page.keyboard.press("Space");
      expect(await handle.getProperty("activated")).toBe(true);
      await page.waitForChanges();

      expect(assistiveTextElement.textContent).toBe(
        messageSubstitute({
          text: langTranslations.dragHandleActive,
          setPosition: startIndex + 1,
          label: itemLabel,
          setSize: items.length,
        })
      );

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await handle.getProperty("activated")).toBe(true);
      await page.waitForTimeout(debounceTimeout);

      startIndex += 1;
      const changeHandleLabel = await getAriaLabel();

      expect(changeHandleLabel).toBe(
        messageSubstitute({
          text: langTranslations.dragHandleChange,
          setPosition: startIndex + 1,
          label: itemLabel,
          setSize: items.length,
        })
      );
      await page.keyboard.press("Space");
      await page.waitForChanges();

      expect(assistiveTextElement.textContent).toBe(
        messageSubstitute({
          text: langTranslations.dragHandleCommit,
          setPosition: startIndex + 1,
          label: itemLabel,
          setSize: items.length,
        })
      );

      await page.keyboard.press("Space");
      await page.waitForChanges();
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(await handle.getProperty("activated")).toBe(false);
    });
  });
});
