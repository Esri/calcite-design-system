import { E2EPage, E2EElement, newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  hidden,
  floatingUIOwner,
  formAssociated,
  labelable,
  openClose,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS as ComboboxItemCSS } from "../combobox-item/resources";
import { CSS as XButtonCSS } from "../functional/XButton";
import { getElementXY, newProgrammaticE2EPage, skipAnimations } from "../../tests/utils";
import { assertCaretPosition } from "../../tests/utils";
import { DEBOUNCE } from "../../utils/resources";
import { CSS } from "./resources";

const selectionModes = ["single", "single-persist", "ancestors", "multiple"];

describe("calcite-combobox", () => {
  describe("renders", () => {
    renders("calcite-combobox", { display: "block" });
  });

  describe("defaults", () => {
    defaults("calcite-combobox", [
      {
        propertyName: "clearDisabled",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-combobox", [
      {
        propertyName: "allowCustomValues",
        value: true,
      },
      {
        propertyName: "clearDisabled",
        value: true,
      },
      {
        propertyName: "form",
        value: "test-form",
      },
      {
        propertyName: "maxItems",
        value: 1,
      },
      {
        propertyName: "name",
        value: "test-name",
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        // needs to run after `open` since it resets `open` after it's asserted value
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "placeholderIcon",
        value: "banana",
      },
      {
        propertyName: "placeholderIconFlipRtl",
        value: true,
      },
      {
        propertyName: "required",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "selectionMode",
        value: "single",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-combobox");
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-combobox label="Trees" value="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      </calcite-combobox>
    `);
  });

  describe("accessible with item group", () => {
    accessible(html`
      <calcite-combobox label="Trees" value="Trees">
        <calcite-combobox-item-group label="Conifers">
          <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);
  });

  describe("accessible with open selected items", () => {
    accessible(html`
      <calcite-combobox open label="Trees" value="Trees">
        <calcite-combobox-item-group label="Conifers">
          <calcite-combobox-item selected value="Pine" text-label="Pine"></calcite-combobox-item>
          <calcite-combobox-item selected value="Spruce" text-label="Spruce"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);
  });

  describe("labelable", () => {
    labelable("calcite-combobox");
  });

  describe("disabled", () => {
    disabled("calcite-combobox", {
      focusTarget: {
        tab: "calcite-combobox",
        click: {
          pointer: "calcite-combobox",
          method: "calcite-combobox",
        },
      },
    });
  });

  const simpleComboboxHTML = html`
    <calcite-combobox id="myCombobox">
      <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
      <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
      <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
      <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
    </calcite-combobox>
  `;

  describe("openClose", () => {
    openClose(simpleComboboxHTML);
  });

  describe("filtering", () => {
    it("should toggle the combobox when typing within the input", async () => {
      const page = await newE2EPage();

      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
          <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
          <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
          <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      await combobox.callMethod("setFocus");
      await page.waitForChanges();
      expect(await combobox.getProperty("open")).toBe(false);

      const text = "Arizona";

      await combobox.type(text);
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      expect(await combobox.getProperty("open")).toBe(true);

      for (let i = 0; i < text.length; i++) {
        await combobox.press("Backspace");
      }

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(await combobox.getProperty("open")).toBe(false);
    });

    it("should not toggle the combobox when typing within the input does not match any results", async () => {
      const page = await newE2EPage();

      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
          <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
          <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
          <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      await combobox.callMethod("setFocus");
      await page.waitForChanges();
      expect(await combobox.getProperty("open")).toBe(false);

      const text = "nomatchingtexthere";

      await combobox.type(text);
      await page.waitForChanges();

      expect(await combobox.getProperty("open")).toBe(false);
    });

    it("filtering does not match property with value of undefined", async () => {
      const page = await newE2EPage();

      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
          <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
          <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
          <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      const input = await page.find("calcite-combobox >>> input");
      const items = await page.findAll("calcite-combobox-item");
      await combobox.click();
      await page.waitForChanges();

      await input.type("undefined");
      await page.waitForTimeout(DEBOUNCE.filter);
      await page.waitForChanges();

      expect(await items[0].isVisible()).toBe(false);
      expect(await items[1].isVisible()).toBe(false);
      expect(await items[2].isVisible()).toBe(false);
      expect(await items[3].isVisible()).toBe(false);
    });

    it("should filter the items in listbox when typing into the input", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox>
          <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
          <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
          <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
          <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      const items = await page.findAll("calcite-combobox-item");

      const openEvent = await combobox.spyOnEvent("calciteComboboxOpen");
      const filterEventSpy = await combobox.spyOnEvent("calciteComboboxFilterChange");

      await combobox.click();
      await page.waitForChanges();
      expect(openEvent).toHaveReceivedEventTimes(1);

      await combobox.press("s");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(filterEventSpy).toHaveReceivedEventTimes(1);

      expect(await items[0].isVisible()).toBe(true);
      expect(await items[1].isVisible()).toBe(true);
      expect(await items[2].isVisible()).toBe(true);
      expect(await items[3].isVisible()).toBe(true);

      expect(await combobox.getProperty("filterText")).toBe("s");
      expect((await combobox.getProperty("filteredItems")).length).toBe(4);

      await combobox.press("i");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(filterEventSpy).toHaveReceivedEventTimes(2);

      expect(await items[0].isVisible()).toBe(true);
      expect(await items[1].isVisible()).toBe(true);
      expect(await items[2].isVisible()).toBe(false);
      expect(await items[3].isVisible()).toBe(true);

      expect(await combobox.getProperty("filterText")).toBe("si");
      expect((await combobox.getProperty("filteredItems")).length).toBe(3);

      await combobox.press("n");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      expect(filterEventSpy).toHaveReceivedEventTimes(3);

      expect(await items[0].isVisible()).toBe(true);
      expect(await items[1].isVisible()).toBe(true);
      expect(await items[2].isVisible()).toBe(false);
      expect(await items[3].isVisible()).toBe(false);

      expect(await combobox.getProperty("filterText")).toBe("sin");
      expect((await combobox.getProperty("filteredItems")).length).toBe(2);
    });

    it("does not clear filter if pointer down/up on an item has a delay in between events", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox clear-disabled="true" selection-mode="single-persist" placeholder="Select a field">
          <calcite-combobox-item id="item-1" value="France/Germany" text-label="France/Germany"></calcite-combobox-item>
          <calcite-combobox-item id="item-2" value="Spain/Portugal" text-label="Spain/Portugal"></calcite-combobox-item>
          <calcite-combobox-item
            id="item-3"
            value="Indonesia/Malaysia"
            text-label="Indonesia/Malaysia"
          ></calcite-combobox-item>
          <calcite-combobox-item id="item-4" value="Libya/Algeria" text-label="Libya/Algeria"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      await combobox.click();
      await page.waitForChanges();
      await combobox.type("Algeria");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const [lastItemX, lastItemY] = await getElementXY(page, "#item-4");

      await page.mouse.move(lastItemX, lastItemY);
      await page.mouse.down();
      await page.waitForChanges();
      await page.mouse.up();
      await page.waitForChanges();

      expect(await combobox.getProperty("value")).toBe("Libya/Algeria");
    });

    it("respects the filterDisabled item property", async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <calcite-combobox selection-mode="single">
        <calcite-combobox-item id="one" value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item id="two" value="two" text-label="Two" ></calcite-combobox-item>
        <calcite-combobox-item id="three" value="three" text-label="Three" filter-disabled></calcite-combobox-item>
      </calcite-combobox>
    `);

      const combobox = await page.find("calcite-combobox");
      await combobox.click();
      await page.waitForChanges();
      await combobox.type("two");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);
      const one = await (await page.find("#one")).isVisible();
      const two = await (await page.find("#two")).isVisible();
      const three = await (await page.find("#three")).isVisible();

      expect(one).toBeFalsy();
      expect(two).toBeTruthy();
      expect(three).toBeTruthy();
    });

    const nestedComboboxChildren = html`
      <calcite-combobox-item-group id="group-1" label="group 1">
        <calcite-combobox-item id="item-1-1" value="a" text-label="item 1.1"></calcite-combobox-item>
        <calcite-combobox-item id="item-1-2" value="b" text-label="item 1.2"></calcite-combobox-item>

        <calcite-combobox-item-group id="subgroup-1-1" label="subgroup 1.1">
          <calcite-combobox-item id="item-1-1-1" value="c" text-label="item 1.1.1"></calcite-combobox-item>
          <calcite-combobox-item-group id="subgroup-1-1-1" label="subgroup 1.1.1 (empty)"></calcite-combobox-item-group>

          <calcite-combobox-item-group id="subgroup-1-1-2" label="subgroup 1.1.2">
            <calcite-combobox-item id="item-1-1-2-1" value="d" text-label="item 1.1.2.1">
              <calcite-combobox-item id="item-1-1-2-2" value="e" text-label="subitem 1.1.2.2"></calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox-item-group>
      </calcite-combobox-item-group>

      <calcite-combobox-item-group id="group-2" label="group 2">
        <calcite-combobox-item id="item-2-1" value="f" text-label="item 2.1">
          <calcite-combobox-item id="item-2-1-1" value="g" text-label="subitem 2.1.1"></calcite-combobox-item>
          <calcite-combobox-item id="item-2-1-2" value="h" text-label="subitem 2.1.2"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox-item-group>
    `;

    it("should filter on initial load", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-combobox filter-text="1.2"> ${nestedComboboxChildren} </calcite-combobox> `);
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const visibleItemsAndGroups = await page.findAll(
        "calcite-combobox-item:not([hidden]), calcite-combobox-item-group:not([hidden])",
      );
      const visibleItemAndGroupIds = await Promise.all(visibleItemsAndGroups.map((item) => item.getProperty("id")));

      expect(visibleItemAndGroupIds).toEqual([
        "group-1",
        "item-1-2",
        "subgroup-1-1",
        "subgroup-1-1-2",
        "item-1-1-2-1",
        "item-1-1-2-2",
        "group-2",
        "item-2-1",
        "item-2-1-2",
      ]);
    });

    it("should display all groups/items when filter is cleared", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-combobox> ${nestedComboboxChildren} </calcite-combobox> `);
      await page.waitForChanges();

      const combobox = await page.find("calcite-combobox");
      combobox.setProperty("filterText", "1.2");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const filteredItemsAndGroups = await page.findAll(
        "calcite-combobox-item:not([hidden]), calcite-combobox-item-group:not([hidden])",
      );
      const filteredItemAndGroupIds = await Promise.all(filteredItemsAndGroups.map((item) => item.getProperty("id")));

      expect(filteredItemAndGroupIds).toEqual([
        "group-1",
        "item-1-2",
        "subgroup-1-1",
        "subgroup-1-1-2",
        "item-1-1-2-1",
        "item-1-1-2-2",
        "group-2",
        "item-2-1",
        "item-2-1-2",
      ]);

      combobox.setProperty("filterText", "");
      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const allVisibleItemAndGroups = await page.findAll(
        "calcite-combobox-item:not([hidden]), calcite-combobox-item-group:not([hidden])",
      );
      const allVisibleItemAndGroupIds = await Promise.all(
        allVisibleItemAndGroups.map((item) => item.getProperty("id")),
      );
      expect(allVisibleItemAndGroupIds).toEqual([
        "group-1",
        "item-1-1",
        "item-1-2",
        "subgroup-1-1",
        "item-1-1-1",
        "subgroup-1-1-1",
        "subgroup-1-1-2",
        "item-1-1-2-1",
        "item-1-1-2-2",
        "group-2",
        "item-2-1",
        "item-2-1-1",
        "item-2-1-2",
      ]);
    });

    it("allows filtering via item metadata", async () => {
      const page = await newProgrammaticE2EPage();

      await page.evaluate(() => {
        const combobox = document.createElement("calcite-combobox");

        const item1 = document.createElement("calcite-combobox-item");
        item1.value = "1";
        item1.textLabel = "One";
        item1.metadata = { foo: "foo" };
        combobox.append(item1);

        const item2 = document.createElement("calcite-combobox-item");
        item2.value = "2";
        item2.textLabel = "Two";
        item2.metadata = { bar: "bar" };
        combobox.append(item2);

        document.body.append(combobox);
      });

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const combobox = await page.find("calcite-combobox");
      combobox.setProperty("filterText", "foo");

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      const visibleItems = await page.findAll("calcite-combobox-item:not([hidden])");

      expect(visibleItems.length).toBe(1);
      expect(await visibleItems[0].getProperty("value")).toBe("1");
    });

    it("should restore filter text when no items are filtered", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox placeholder="Select a field" selection-mode="single-persist">
          <calcite-combobox-item
            id="one"
            value="Natural Resources"
            text-label="Natural Resources"
            selected
          ></calcite-combobox-item>
          <calcite-combobox-item id="two" value="Agriculture" text-label="Agriculture"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="Transportation" text-label="Transportation"></calcite-combobox-item>
        </calcite-combobox>
      `);

      const combobox = await page.find("calcite-combobox");
      const input = await page.find("calcite-combobox >>> input");
      await combobox.click();
      await page.waitForChanges();
      await combobox.type("an");
      await page.waitForChanges();
      await new Promise((res) => setTimeout(() => res(true), DEBOUNCE.filter));
      const one = await page.find("#one");
      const two = await page.find("#two");
      const three = await page.find("#three");

      expect(await one.isVisible()).toBeFalsy();
      expect(await two.isVisible()).toBeFalsy();
      expect(await three.isVisible()).toBeTruthy();

      await combobox.type("m");
      await new Promise((res) => setTimeout(() => res(true), DEBOUNCE.filter));
      await page.waitForChanges();
      expect(await one.isVisible()).toBeFalsy();
      expect(await two.isVisible()).toBeFalsy();
      expect(await three.isVisible()).toBeFalsy();

      expect(await combobox.getProperty("value")).toBe("Natural Resources");
      expect((await combobox.getProperty("filteredItems")).length).toBe(0);
      expect(await input.getProperty("value")).toBe("anm");
      expect(input).not.toHaveClass(`${CSS.inputHidden}`);
    });
  });

  it("should control max items displayed", async () => {
    const maxItems = 7;
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-combobox max-items="${maxItems}">
        <calcite-combobox-item id="item-0" value="item-0" text-label="item-0">
          <calcite-combobox-item id="item-1" value="item-1" text-label="item-1"></calcite-combobox-item>
          <calcite-combobox-item id="item-2" value="item-2" text-label="item-2"></calcite-combobox-item>
          <calcite-combobox-item id="item-3" value="item-3" text-label="item-3"></calcite-combobox-item>
          <calcite-combobox-item id="item-4" value="item-4" text-label="item-4"></calcite-combobox-item>
          <calcite-combobox-item id="item-5" value="item-5" text-label="item-5"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item id="item-6" value="item-6" text-label="item-6">
          <calcite-combobox-item id="item-7" value="item-7" text-label="item-7"></calcite-combobox-item>
          <calcite-combobox-item id="item-8" value="item-8" text-label="item-8"></calcite-combobox-item>
          <calcite-combobox-item id="item-9" value="item-9" text-label="item-9"></calcite-combobox-item>
          <calcite-combobox-item id="item-10" value="item-10" text-label="item-10"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    `);

    const element = await page.find("calcite-combobox");
    await element.click();
    await page.waitForChanges();

    const items = await page.findAll("calcite-combobox-item, calcite-combobox-item-group");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].isIntersectingViewport()).toBe(i < maxItems);
    }
  });

  it("should control max items displayed with group", async () => {
    const page = await newE2EPage();

    const maxItems = 8;

    await page.setContent(`
      <calcite-combobox max-items="${maxItems}">
        <calcite-combobox-item id="item-0" value="item-0" text-label="item-0">
          <calcite-combobox-item id="item-1" value="item-1" text-label="item-1"></calcite-combobox-item>
          <calcite-combobox-item id="item-2" value="item-2" text-label="item-2"></calcite-combobox-item>
          <calcite-combobox-item id="item-3" value="item-3" text-label="item-3"></calcite-combobox-item>
          <calcite-combobox-item id="item-4" value="item-4" text-label="item-4"></calcite-combobox-item>
          <calcite-combobox-item id="item-5" value="item-5" text-label="item-5"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item-group id="item-6" label="item-6">
          <calcite-combobox-item id="item-7" value="item-7" text-label="item-7"></calcite-combobox-item>
          <calcite-combobox-item id="item-8" value="item-8" text-label="item-8"></calcite-combobox-item>
          <calcite-combobox-item id="item-9" value="item-9" text-label="item-9"></calcite-combobox-item>
          <calcite-combobox-item id="item-10" value="item-10" text-label="item-10"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);
    await page.waitForChanges();

    const element = await page.find("calcite-combobox");
    await element.click();
    await page.waitForChanges();

    const items = await page.findAll("calcite-combobox-item, calcite-combobox-item-group");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].isIntersectingViewport()).toBe(i < maxItems);
    }
  });

  it("should show correct max items when nested", async () => {
    const page = await newE2EPage();

    const maxItems = 6;

    await page.setContent(`
    <calcite-combobox label="custom values" allow-custom-values placeholder="placeholder" max-items="6">
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine">
          <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
    `);
    await page.waitForChanges();

    const element = await page.find("calcite-combobox");
    await element.click();
    await page.waitForChanges();
    const items = await page.findAll("calcite-combobox-item, calcite-combobox-item-group");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].isIntersectingViewport()).toBe(i < maxItems);
    }
  });

  it("should show correct max items after selection", async () => {
    const page = await newE2EPage();
    const maxItems = 6;
    await page.setContent(html`
      <calcite-combobox label="custom values" allow-custom-values placeholder="placeholder" max-items="6">
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
        <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
        <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
        <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
      </calcite-combobox>
    `);
    const element = await page.find("calcite-combobox");
    const openEvent = page.waitForEvent("calciteComboboxOpen");
    await element.click();
    await openEvent;

    await element.press("p");
    await element.press("i");
    await page.waitForChanges();
    await element.press("Enter");
    await page.waitForChanges();

    const items = await page.findAll("calcite-combobox-item, calcite-combobox-item-group");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].isIntersectingViewport()).toBe(i < maxItems);
    }
  });

  describe("item selection", () => {
    describe("toggling items", () => {
      describe("via keyboard", () => {
        assertSelectionModeToggling(async (item): Promise<void> => {
          await item.press("Enter");
        });
      });

      describe("via mouse", () => {
        assertSelectionModeToggling(async (item): Promise<void> => {
          await item.click();
        });
      });

      async function assertSelectionModeToggling(selectItem: (item: E2EElement) => Promise<void>): Promise<void> {
        it("single-selection mode allows toggling selection once the selected item is selected", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-combobox selection-mode="single">
              <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
            </calcite-combobox>
          `);
          const combobox = await page.find("calcite-combobox");
          const firstOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await firstOpenEvent;

          const item1 = await combobox.find("calcite-combobox-item[value=one]");

          await selectItem(item1);
          expect(await combobox.getProperty("value")).toBe("one");

          const secondOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await secondOpenEvent;

          await selectItem(item1);
          expect(await combobox.getProperty("value")).toBe("");
        });

        it("single-persist-selection mode does not allow toggling selection once the selected item is selected", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-combobox selection-mode="single-persist">
              <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
            </calcite-combobox>
          `);
          const combobox = await page.find("calcite-combobox");
          const firstOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await firstOpenEvent;

          const item1 = await combobox.find("calcite-combobox-item[value=one]");

          await selectItem(item1);
          expect(await combobox.getProperty("value")).toBe("one");

          const secondOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await secondOpenEvent;

          await selectItem(item1);
          expect(await combobox.getProperty("value")).toBe("one");
          expect(await combobox.getProperty("open")).toBe(true);
        });

        it("single-persist-selection mode correctly selects different items with the same value", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-combobox selection-mode="single-persist">
              <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
              <calcite-combobox-item value="one" heading="two"></calcite-combobox-item>
            </calcite-combobox>
          `);

          const combobox = await page.find("calcite-combobox");

          const firstOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await firstOpenEvent;

          const item1 = await combobox.find("calcite-combobox-item[heading=one]");
          const item2 = await combobox.find("calcite-combobox-item[heading=two]");

          await item1.click();
          await page.waitForChanges();
          expect(await combobox.getProperty("value")).toBe("one");
          expect(await item1.getProperty("selected")).toBe(true);
          expect(await item2.getProperty("selected")).toBe(false);
          expect(await combobox.getProperty("open")).toBe(false);

          const secondOpenEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await secondOpenEvent;

          await item2.click();
          await page.waitForChanges();
          expect(await combobox.getProperty("value")).toBe("one");
          expect(await item1.getProperty("selected")).toBe(false);
          expect(await item2.getProperty("selected")).toBe(true);
          expect(await combobox.getProperty("open")).toBe(false);
        });

        it("multiple-selection mode allows toggling selection once the selected item is selected", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-combobox selection-mode="multiple">
              <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
            </calcite-combobox>
          `);
          const combobox = await page.find("calcite-combobox");
          const openEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await openEvent;

          const item1 = await combobox.find("calcite-combobox-item[value=one]");

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeDefined();

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeNull();

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeDefined();
        });

        it("ancestors-selection mode allows toggling selection once the selected item is selected", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-combobox selection-mode="ancestors">
              <calcite-combobox-item value="one" text-label="parent">
                <calcite-combobox-item value="two" text-label="child1"></calcite-combobox-item>
                <calcite-combobox-item value="three" text-label="child2"></calcite-combobox-item>
              </calcite-combobox-item>
            </calcite-combobox>
          `);
          const combobox = await page.find("calcite-combobox");
          const openEvent = page.waitForEvent("calciteComboboxOpen");
          await combobox.click();
          await openEvent;

          const item1 = await combobox.find("calcite-combobox-item[value=one]");

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeDefined();

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeNull();

          await selectItem(item1);
          expect(await page.find("calcite-combobox >>> calcite-chip")).toBeDefined();
        });
      }
    });

    it("should select parent in ancestor selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item value="one" text-label="one">
            <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await combobox.click();
      await openEvent;

      const item1 = await combobox.find("calcite-combobox-item[value=child1]");
      await item1.click();

      const parent = await combobox.find("calcite-combobox-item[value=one]");
      expect(parent).toBeDefined();
      expect(parent).toHaveAttribute("selected");

      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
    });

    it("should clear children in ancestor selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item value="parent" text-label="parent">
            <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
            <calcite-combobox-item value="child2" text-label="child2"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await combobox.click();
      await openEvent;

      const parent = await combobox.find("calcite-combobox-item[value=parent]");
      const parentItem = await combobox.find("calcite-combobox-item[value=parent] >>> li");
      const item1 = await combobox.find("calcite-combobox-item[value=child1]");
      const item2 = await combobox.find("calcite-combobox-item[value=child2]");
      await item1.click();
      await item2.click();
      await page.waitForChanges();
      let chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(2);
      expect(parent).toHaveAttribute("selected");
      await parentItem.click();
      chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(0);
      expect(parent).not.toHaveAttribute("selected");
      expect(item1).not.toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
    });

    it("clicking a chip should remove the selected item", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox>
          <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await combobox.click();
      await openEvent;

      const item1 = await combobox.find("calcite-combobox-item[value=one]");
      await item1.click();

      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).not.toBeNull();
      expect(await combobox.getProperty("open")).toBe(true);
      await page.evaluate(() => {
        const combobox = document.querySelector("calcite-combobox");
        const chip = combobox.shadowRoot.querySelector("calcite-chip");
        const closeButton = chip.shadowRoot.querySelector(".close");

        (closeButton as HTMLElement).click();
      });
      await page.waitForChanges();

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();
      expect(await combobox.getProperty("open")).toBe(false);
    });

    it("should honor calciteComboboxChipClose", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-combobox>
          <calcite-combobox-item value="one" selected text-label="one"></calcite-combobox-item>
        </calcite-combobox>`,
      );

      const eventSpy = await page.spyOnEvent("calciteComboboxChipClose", "window");

      const chip = await page.find("calcite-combobox >>> calcite-chip");

      chip.triggerEvent("calciteChipClose");

      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("should auto-select new custom value if selection is empty", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values selection-mode="single">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await page.waitForChanges();

      const item = await page.find("calcite-combobox-item:first-child");
      expect(await item.getProperty("textLabel")).toBe("K");

      const combobox = await page.find("calcite-combobox");

      expect((await combobox.getProperty("selectedItems")).length).toBe(1);
      expect(await item.getProperty("selected")).toBe(true);
    });

    it("should replace current value to new custom value in single selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values selection-mode="single">
          <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      await skipAnimations(page);
      const combobox = await page.find("calcite-combobox");
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await page.waitForChanges();

      const customValue = await page.find("calcite-combobox-item:first-child");
      const item1 = await page.find("calcite-combobox-item#one");

      expect(await customValue.getProperty("textLabel")).toBe("K");

      expect((await combobox.getProperty("selectedItems")).length).toBe(1);
      expect(await customValue.getProperty("selected")).toBe(true);
      expect(await item1.getProperty("selected")).toBe(false);
    });

    it("should auto-select new custom values in multiple selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await input.press("Escape");
      await page.waitForChanges();

      const customValue = await page.find("calcite-combobox-item:first-child");
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const chips = await page.findAll("calcite-combobox >>> calcite-chip");

      expect((await combobox.getProperty("selectedItems")).length).toBe(3);
      expect(chips[2].textContent).toBe("K");
      expect(await customValue.getProperty("selected")).toBe(true);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(true);
    });
  });

  describe("clearing values", () => {
    describe("enabled", () => {
      const testCases = [
        {
          selectionMode: "single",
          html: html`
            <calcite-combobox selection-mode="single">
              <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
              <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
            </calcite-combobox>
          `,
        },
        {
          selectionMode: "multiple",
          html: html`
            <calcite-combobox selection-mode="multiple">
              <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
              <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>
            </calcite-combobox>
          `,
        },
        {
          selectionMode: "ancestors",
          html: html`
            <calcite-combobox selection-mode="ancestors">
              <calcite-combobox-item value="parent" text-label="parent">
                <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
                <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
              </calcite-combobox-item>
            </calcite-combobox>
          `,
        },
      ];

      describe("via mouse", () => {
        testCases.forEach((testCase) => {
          it(`clears the value in ${testCase.selectionMode}-selection mode`, () =>
            assertValueClearing(testCase.html, "mouse", "clear"));
        });
      });

      describe("via keyboard", () => {
        testCases.forEach((testCase) => {
          it(`clears the value in ${testCase.selectionMode}-selection mode`, () =>
            assertValueClearing(testCase.html, "keyboard", "clear"));
        });
      });
    });

    describe("disabled", () => {
      const testCases = [
        {
          selectionMode: "single",
          html: html`
            <calcite-combobox clear-disabled selection-mode="single">
              <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
              <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
            </calcite-combobox>
          `,
        },
        {
          selectionMode: "multiple",
          html: html`
            <calcite-combobox clear-disabled selection-mode="multiple">
              <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
              <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
              <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>
            </calcite-combobox>
          `,
        },
        {
          selectionMode: "ancestors",
          html: html`
            <calcite-combobox clear-disabled selection-mode="ancestors">
              <calcite-combobox-item value="parent" text-label="parent">
                <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
                <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
              </calcite-combobox-item>
            </calcite-combobox>
          `,
        },
      ];

      describe("via mouse", () => {
        testCases.forEach((testCase) => {
          it(`clears the value in ${testCase.selectionMode}-selection mode`, () =>
            assertValueClearing(testCase.html, "mouse", "no-clear"));
        });
      });

      describe("via keyboard", () => {
        testCases.forEach((testCase) => {
          it(`clears the value in ${testCase.selectionMode}-selection mode`, () =>
            assertValueClearing(testCase.html, "keyboard", "no-clear"));
        });
      });
    });

    async function assertValueClearing(
      html: string,
      mode: "mouse" | "keyboard",
      expectedBehavior: "clear" | "no-clear",
    ): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html);

      const combobox = await page.find("calcite-combobox");
      if (mode === "mouse") {
        const xButton = await page.find(`calcite-combobox >>> .${XButtonCSS.button}`);

        if (expectedBehavior === "clear") {
          await xButton.click();
        } else {
          expect(xButton).toBeNull();
        }
      } else {
        await combobox.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("Escape");
      }

      if (expectedBehavior === "clear") {
        expect(await combobox.getProperty("value")).toBe("");
      } else {
        expect(await combobox.getProperty("value")).not.toBe("");
      }
    }
  });

  describe("keyboard navigation with chips", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox id="myCombobox" placeholder="Select a field">
          <calcite-combobox-item value="Natural Resources" text-label="Natural Resources"></calcite-combobox-item>
          <calcite-combobox-item value="Agriculture" text-label="Agriculture"></calcite-combobox-item>
          <calcite-combobox-item value="Forestry" text-label="Forestry"></calcite-combobox-item>
          <calcite-combobox-item selected value="Mining" text-label="Mining"></calcite-combobox-item>
          <calcite-combobox-item value="Business" text-label="Business"></calcite-combobox-item>
          <calcite-combobox-item selected value="Education" text-label="Education"></calcite-combobox-item>
          <calcite-combobox-item selected value="Utilities" text-label="Utilities"></calcite-combobox-item>
          <calcite-combobox-item value="Transportation" text-label="Transportation"></calcite-combobox-item>
        </calcite-combobox>
      `);
    });

    it("should navigate chips and text with arrow keys", async () => {
      const comboboxId = "myCombobox";
      const componentTag = "calcite-combobox";
      const inputId = "input";
      const chipId = "chip";

      const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

      const getDataTestId = () =>
        page.$eval(`#${comboboxId}`, (myCombobox) => myCombobox.shadowRoot.activeElement.getAttribute("data-test-id"));

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 0 });

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 0 });

      await page.keyboard.type("zz");
      await page.waitForChanges();

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 2 });

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 2 });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 1 });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 0 });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-2`);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-1`);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-0`);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-0`);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-1`);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(`${chipId}-2`);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 0 });

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 2 });

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await getActiveElementId()).toBe(comboboxId);
      expect(await getDataTestId()).toBe(inputId);
      await assertCaretPosition({ page, componentTag, position: 0 });
    });
  });

  describe("keyboard navigation in all selection-display mode", () => {
    let page: E2EPage;
    const scrollablePageSizeInPx = 2400;
    // PageUp/Down scroll test fails without the delay
    const scrollTestDelayInMilliseconds = 500;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item-group text-label="Last Item">
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox>
      `);
    });

    it("should not show the listbox when it receives focus", async () => {
      const input = await page.find(`#myCombobox >>> input`);
      await input.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      const container = await page.find(`#myCombobox >>> .${CSS.floatingUIContainer}`);
      const visible = await container.isVisible();
      expect(visible).toBe(false);
    });

    it("tab moves to next input, but doesn't open the item group", async () => {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      const floatingUI = await page.find(`#myCombobox >>> .${CSS.floatingUIContainer}`);
      expect(await floatingUI.isVisible()).toBe(false);
    });

    it("tab will close the item group if it’s open", async () => {
      skipAnimations(page);
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      const floatingUI = await page.find(`#myCombobox >>> .${CSS.floatingUIContainer}`);
      expect(await floatingUI.isVisible()).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await floatingUI.isVisible()).toBe(false);
    });

    it("should not throw when typing custom value and pressing ArrowDown", async () => {
      const combobox = await page.find("calcite-combobox");
      combobox.setProperty("allowCustomValues", true);
      await page.waitForChanges();
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");
      await page.keyboard.type("asdf");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
    });

    it(`ArrowDown opens the item group for combobox in focus and jumps to the first item`, async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      const firstFocusedGroupItem = await page.find(`#one >>> .${ComboboxItemCSS.active}`);
      expect(firstFocusedGroupItem).toBeTruthy();
    });

    it(`Escape closes the dropdown, but remains focused`, async () => {
      await skipAnimations(page);
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      const floatingUI = await page.find(`#myCombobox >>> .${CSS.floatingUIContainer}`);
      expect(await floatingUI.isVisible()).toBe(true);

      await page.keyboard.press("Escape");
      await page.waitForChanges();
      expect(await floatingUI.isVisible()).toBe(false);

      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");
    });

    it(`Space opens dropdown and puts focus on first item and subsequent Space do not change the focus`, async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      const firstFocusedGroupItem = await page.find(`#one >>> .${ComboboxItemCSS.active}`);
      expect(firstFocusedGroupItem).toBeTruthy();

      const visible = await firstFocusedGroupItem.isVisible();
      expect(visible).toBe(true);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(firstFocusedGroupItem).toBeTruthy();
    });

    it("when the combobox is focused & closed, Page up/down (fn arrow up/down) scrolls up and down the page", async () => {
      await page.addStyleTag({
        // set body to overflow so we can test the scroll functionality;
        // set default margin/padding to 0 to not have to adjust for it in position calculations
        content: `body {
              height: ${scrollablePageSizeInPx}px;
              width: ${scrollablePageSizeInPx}px;
            }
            html, body {
              margin: 0;
              padding: 0;
            }
        `,
      });
      const combobox = await page.find("calcite-combobox");
      await combobox.callMethod(`setFocus`);
      const floatingUI = await page.find(`#myCombobox >>> .${CSS.floatingUIContainer}`);
      expect(await floatingUI.isVisible()).toBe(false);
      expect(await page.evaluate(() => window.scrollY)).toEqual(0);

      await page.keyboard.press("PageDown");
      await page.waitForTimeout(scrollTestDelayInMilliseconds);
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeTruthy();

      await page.keyboard.press("PageUp");
      await page.waitForTimeout(scrollTestDelayInMilliseconds);
      expect(
        await page.evaluate((scrollPosition) => {
          return window.scrollY < scrollPosition;
        }, scrollPosition),
      ).toBeTruthy();
    });

    it("should cycle through items on ArrowUp/ArrowDown and toggle selection on/off on Enter", async () => {
      const eventSpy = await page.spyOnEvent("calciteComboboxChange", "window");
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      const element = await page.find("calcite-combobox");
      await element.click();
      expect(await item1.getProperty("active")).toBe(true);
      expect(await item2.getProperty("active")).toBe(false);
      expect(await item3.getProperty("active")).toBe(false);
      await element.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(false);
      expect(await item2.getProperty("active")).toBe(true);
      expect(await item3.getProperty("active")).toBe(false);
      await element.press("ArrowUp");
      expect(await item1.getProperty("active")).toBe(true);
      expect(await item2.getProperty("active")).toBe(false);
      expect(await item3.getProperty("active")).toBe(false);
      await element.press("ArrowUp");
      expect(await item1.getProperty("active")).toBe(false);
      expect(await item2.getProperty("active")).toBe(false);
      expect(await item3.getProperty("active")).toBe(true);
      await element.press("ArrowUp");
      expect(await item1.getProperty("active")).toBe(false);
      expect(await item2.getProperty("active")).toBe(true);
      expect(await item3.getProperty("active")).toBe(false);
      await element.press("ArrowDown");
      await element.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(true);
      expect(await item2.getProperty("active")).toBe(false);
      expect(await item3.getProperty("active")).toBe(false);
      await element.press("Enter");
      expect(await item1.getProperty("selected")).toBe(true);
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await element.press("Enter");
      expect(await item1.getProperty("selected")).toBe(false);
      expect(eventSpy).toHaveReceivedEventTimes(2);
    });

    describe("keyboard interaction with chips", () => {
      let element;
      let chips;

      beforeEach(async () => {
        element = await page.find("#myCombobox");
        await element.click();

        const item1 = await page.find("calcite-combobox-item#one");
        const item2 = await page.find("calcite-combobox-item#two");
        const item3 = await page.find("calcite-combobox-item:last-child");
        await item1.click();
        await item2.click();
        await item3.click();

        chips = await page.findAll("#myCombobox >>> calcite-chip");
      });

      it("should cycle through chips on left/right keys", async () => {
        await element.click();
        await page.waitForChanges();

        await element.press("ArrowLeft");
        expect(chips[0]).not.toHaveClass("chip--active");
        expect(chips[1]).not.toHaveClass("chip--active");
        expect(chips[2]).toHaveClass("chip--active");

        await element.press("ArrowLeft");
        expect(chips[0]).not.toHaveClass("chip--active");
        expect(chips[1]).toHaveClass("chip--active");
        expect(chips[2]).not.toHaveClass("chip--active");

        await element.press("Delete");
        chips = await page.findAll("#myCombobox >>> calcite-chip");
        expect(chips.length).toEqual(2);
      });

      it("should delete last item on Delete", async () => {
        expect((await element.getProperty("selectedItems")).length).toBe(3);
        await element.click();
        await element.press("Backspace");
        expect((await element.getProperty("selectedItems")).length).toBe(2);
      });
    });
  });

  describe("deleting items with the keyboard in single and fit selection-display modes", () => {
    it("should not delete any items on Delete in single selection-display mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-display="single">
          <calcite-combobox-item id="one" value="one" label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" label="two"></calcite-combobox-item>
          <calcite-combobox-item-group label="Last Item">
            <calcite-combobox-item id="three" value="three" label="three"></calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const input = await page.find(`calcite-combobox >>> .${CSS.input}`);
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      await input.click();
      await item1.click();
      await item2.click();
      await item3.click();
      await input.click();
      await combobox.press("Backspace");

      expect((await combobox.getProperty("selectedItems")).length).toBe(3);
    });

    it("should not delete any items on Delete in fit selection-display mode when there are overflowed chips", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-display="fit" style="width:350px">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item-group text-label="Last Item">
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const input = await page.find(`calcite-combobox >>> .${CSS.input}`);
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      await input.click();
      await item1.click();
      await item2.click();
      await item3.click();
      await input.click();
      await input.press("Backspace");

      expect((await combobox.getProperty("selectedItems")).length).toBe(3);
    });

    it("should delete last item on Delete in fit selection-display mode when there are no overflowed chips", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-display="fit" style="width:450px">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item-group text-label="Last Item">
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox>
      `);
      const combobox = await page.find("calcite-combobox");
      const input = await page.find(`calcite-combobox >>> .${CSS.input}`);
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      await input.click();
      await item1.click();
      await item2.click();
      await item3.click();
      await input.click();
      await input.press("Backspace");

      expect((await combobox.getProperty("selectedItems")).length).toBe(2);
    });
  });

  describe("calciteComboboxChange", () => {
    it("should have 1 selectedItem when single select", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);

      await page.waitForChanges();

      const element = await page.find("calcite-combobox");
      await element.click();
      await page.waitForChanges();

      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const two = await page.find("#two");
      const event = page.waitForEvent("calciteComboboxChange");
      await two.click();
      await event;

      const combobox = await page.find("calcite-combobox");

      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect((await combobox.getProperty("selectedItems")).length).toBe(1);
    });

    it("should have 2 selectedItems when not in single select", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="multiple">
          <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      await page.waitForChanges();

      const element = await page.find("calcite-combobox");
      await element.click();
      await page.waitForChanges();

      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const two = await page.find("#two");
      const event = page.waitForEvent("calciteComboboxChange");
      await two.click();
      await event;

      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect((await element.getProperty("selectedItems")).length).toBe(2);
    });
  });

  describe("calciteComboboxItemChange event correctly updates active item index", () => {
    let page: E2EPage;
    let element: E2EElement;
    let comboboxItem: E2EElement;
    let itemNestedLi: E2EElement;
    let closeEvent: Promise<unknown>;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item value="Trees">
            <calcite-combobox-item value="Pine">
              <calcite-combobox-item id="PineNested" value="Pine Nested"></calcite-combobox-item>
            </calcite-combobox-item>
            <calcite-combobox-item value="Sequoia"></calcite-combobox-item>
            <calcite-combobox-item value="Douglas Fir"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Flowers">
            <calcite-combobox-item value="Daffodil"></calcite-combobox-item>
            <calcite-combobox-item value="Black Eyed Susan"></calcite-combobox-item>
            <calcite-combobox-item value="Nasturtium"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>
      `);
      element = await page.find("calcite-combobox");
      await element.click();

      comboboxItem = await page.find("calcite-combobox-item#PineNested");
      await comboboxItem.click();
      await page.waitForChanges();

      itemNestedLi = await page.find("calcite-combobox-item#PineNested >>> li");
      closeEvent = page.waitForEvent("calciteComboboxClose");
    });

    it("clicking on Listbox item focuses on the item and closes out of Listbox with tab", async () => {
      expect(itemNestedLi).toHaveClass(ComboboxItemCSS.active);

      await element.press("Tab");
      await closeEvent;
      await element.press("Tab");
      expect(await page.evaluate(() => document.activeElement.id)).not.toBe("calcite-combobox");
    });

    it("after click interaction with listbox, user can transition to using keyboard “enter” to toggle selected on/off", async () => {
      expect(itemNestedLi).toHaveClass(ComboboxItemCSS.active);

      await itemNestedLi.press("Enter");
      expect(itemNestedLi).not.toHaveClass(ComboboxItemCSS.selected);
      expect(itemNestedLi).toHaveClass(ComboboxItemCSS.active);

      await itemNestedLi.press("Enter");
      expect(itemNestedLi).toHaveClass(ComboboxItemCSS.selected);
      expect(itemNestedLi).toHaveClass(ComboboxItemCSS.active);

      await element.press("Tab");
      await closeEvent;
      await element.press("Tab");
      expect(await page.evaluate(() => document.activeElement.id)).not.toBe("calcite-combobox");
    });
  });

  describe("allows free entry of text", () => {
    it("should allow typing a new unknown tag", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const element = await page.find("calcite-combobox");
      await element.click();

      await element.press("K");
      await element.press("Enter");

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeDefined();
      expect(await chip.getProperty("value")).toBe("K");

      await element.click();

      await element.press("K");
      await element.press("Enter");
      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
    });

    it("should fire calciteComboboxChange when entering new unknown tag", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("K");
      await input.press("Enter");
      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("should allow enter unknown tag when tabbing away", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
        <button>OK</button>
      `);
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      const button = await page.find("button");
      await input.click();
      await input.press("o");

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      await input.press("Tab");

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      let chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
      await input.press("j");

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      await button.click();

      await page.waitForChanges();
      await page.waitForTimeout(DEBOUNCE.filter);

      chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(2);
    });

    it("should select known tag when input", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("o");
      await input.press("n");
      await input.press("e");
      await input.press("Enter");

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeDefined();
      expect(await chip.getProperty("value")).toBe("one");
      const item1 = await page.find("calcite-combobox-item#one");
      expect(await item1.getProperty("selected")).toBe(true);
    });
  });

  describe("single select", () => {
    it("should allow selection of single item", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item id="one" value="one" text-label="One"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="Two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      const value = await input.getProperty("value");
      expect(value).toBe("");
      await input.click();

      const container = await page.find(`calcite-combobox >>> .${CSS.floatingUIContainer}`);
      let visible = await container.isVisible();
      expect(visible).toBe(true);

      const items = await page.findAll("calcite-combobox-item");
      expect(items.length).toBe(3);

      const item1 = await page.find("calcite-combobox-item[value=one]");
      const closeEvent = page.waitForEvent("calciteComboboxClose");
      await item1.click();
      await closeEvent;
      const label = await page.find("calcite-combobox >>> .label");
      await page.waitForChanges();
      const labelVisible = await label.isVisible();
      expect(labelVisible).toBe(true);
      expect(label.textContent).toBe("One");

      visible = await container.isVisible();
      expect(visible).toBe(false);
    });
  });

  describe("custom icons", () => {
    it("should use icons if set on items", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox>
          <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
          <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const combobox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await combobox.click();
      await openEvent;

      const items = await page.findAll("calcite-combobox-item");
      await items[0].click();
      await items[1].click();
      await items[2].click();
      await page.waitForChanges();

      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      const icon1 = await chips[0].getProperty("icon");
      const icon2 = await chips[1].getProperty("icon");
      const icon3 = await chips[2].getProperty("icon");

      expect(icon1).toBe("banana");
      expect(icon2).toBe("beaker");
      expect(icon3).toBeUndefined();
    });

    it("should use icon in single select", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
          <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
        </calcite-combobox>
      `);
      const element = await page.find("calcite-combobox");
      let selected = await page.find("calcite-combobox >>> .selected-icon");
      expect(selected).toBeNull();

      await element.click();
      await page.waitForChanges();

      const items = await page.findAll("calcite-combobox-item");
      await items[0].click();
      await page.waitForChanges();

      selected = await page.find("calcite-combobox >>> .selected-icon");
      let icon = await selected.getProperty("icon");
      expect(icon).toBe("banana");

      await element.click();
      await page.waitForChanges();

      await items[1].click();
      await page.waitForChanges();

      selected = await page.find("calcite-combobox >>> .selected-icon");
      icon = await selected.getProperty("icon");
      expect(icon).toBe("beaker");

      await element.click();
      await page.waitForChanges();

      await items[2].click();
      await page.waitForChanges();
      selected = await page.find("calcite-combobox >>> .selected-icon");
      expect(selected).toBeNull();
    });
  });

  it("works correctly inside a shadowRoot", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div></div>
      <template>
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
          <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two"></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
        </calcite-combobox>
      </template>
      <script>
        const shadowRootDiv = document.querySelector("div");
        const shadowRoot = shadowRootDiv.attachShadow({ mode: "open" });
        shadowRoot.append(document.querySelector("template").content.cloneNode(true));
      </script>
    `);

    await page.waitForChanges();

    const combobox = await page.find("div >>> calcite-combobox");
    const input = await page.find("div >>> calcite-combobox >>> .wrapper");
    expect(await combobox.getProperty("open")).toBeFalsy();
    await input.click();
    expect(await combobox.getProperty("open")).toBe(true);
  });

  describe("is form-associated", () => {
    formAssociated(
      html`<calcite-combobox selection-mode="single">
        <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two" selected></calcite-combobox-item>
        <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
      </calcite-combobox>`,
      { testValue: "two", submitsOnEnter: true, validation: true, changeValueKeys: ["Space", "Enter"] },
    );
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      html`
        <calcite-combobox>
          <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
          <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two" selected></calcite-combobox-item>
          <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
        </calcite-combobox>
      `,
      "open",
      { shadowSelector: `.${CSS.floatingUIContainer}` },
    );
  });

  it("should have input--icon class when placeholder-icon is parsed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-combobox placeholder="What's scarier than 5G?" selection-mode="single" placeholder-icon="car">
        <calcite-combobox-item value="Bluetooth" text-label="Bluetooth" icon="bluetooth"> </calcite-combobox-item>
        <calcite-combobox-item value="Exercise" text-label="Exercise"> </calcite-combobox-item>
        <calcite-combobox-item value="Space Lasers" text-label="Space Lasers" icon="satellite-3">
        </calcite-combobox-item>
      </calcite-combobox>`,
    );

    const comboboxEl = await page.find("calcite-combobox");
    const inputEl = await page.find("calcite-combobox >>> span");
    await page.waitForChanges();

    expect(inputEl).toHaveClass("icon-start");

    comboboxEl.setProperty("open", true);
    await page.waitForChanges();

    expect(inputEl).toHaveClass("icon-start");
  });

  it("should be able to type when tab through the component once", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-combobox>
        <calcite-combobox-item value="Bluetooth" text-label="Bluetooth"> </calcite-combobox-item>
      </calcite-combobox>`,
    );

    const inputEl = await page.find("calcite-combobox >>> input");

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.type("Blue");
    await page.waitForChanges();

    expect(await inputEl.getProperty("value")).toBe("Blue");
  });

  describe("translation support", () => {
    t9n("calcite-combobox");
  });

  it("should not focus on the combobox when items are programmatically selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-combobox open id="demoId">
        <calcite-combobox-item value="test-value" text-label="test"> </calcite-combobox-item>
      </calcite-combobox>`,
    );
    const item = await page.find("calcite-combobox-item");

    item.setProperty("selected", true);
    await page.waitForChanges();
    const focusedId = await page.evaluate(() => {
      const el = document.activeElement;
      return el.id;
    });
    await page.waitForChanges();

    expect(focusedId).toBe("");
  });

  it("should gain focus when it's items are selected via click", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-combobox open id="demoId">
        <calcite-combobox-item value="test-value" text-label="test"> </calcite-combobox-item>
      </calcite-combobox>`,
    );
    await skipAnimations(page);
    const item = await page.find("calcite-combobox-item");
    await item.click();
    await page.waitForChanges();
    const focusedId = await page.evaluate(() => {
      const el = document.activeElement;
      return el.id;
    });

    expect(focusedId).toBe("demoId");
  });

  it("should gain focus when it's items are selected via keyboard interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-combobox id="demoId">
        <calcite-combobox-item value="test-value" text-label="test"> </calcite-combobox-item>
      </calcite-combobox>`,
    );
    await skipAnimations(page);
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    const focusedId = await page.evaluate(() => document.activeElement.id);
    expect(focusedId).toBe("demoId");
  });

  describe("active item when opened", () => {
    async function assertActiveItem(html: string, expectedActiveItemValue: string): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html);
      await skipAnimations(page);
      await page.click("calcite-combobox");
      await page.waitForChanges();

      const activeItem = await page.find("calcite-combobox-item[active]");
      expect(await activeItem.getProperty("value")).toBe(expectedActiveItemValue);
    }

    describe("single-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          html`<calcite-combobox selection-mode="single">
            <calcite-combobox-item value="item1" text-label="item1"></calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2"></calcite-combobox-item>
          </calcite-combobox>`,
          "item1",
        ));

      it("shows the selected item as active when opened", async () =>
        assertActiveItem(
          html`<calcite-combobox selection-mode="single">
            <calcite-combobox-item value="item1" text-label="item1"></calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2"></calcite-combobox-item>
            <calcite-combobox-item value="item3" text-label="item3" selected></calcite-combobox-item>
          </calcite-combobox>`,
          "item3",
        ));
    });

    describe("multiple-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          html` <calcite-combobox selection-mode="multiple">
            <calcite-combobox-item value="item1" text-label="item1"></calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2"></calcite-combobox-item>
            <calcite-combobox-item value="item3" text-label="item3"></calcite-combobox-item>
          </calcite-combobox>`,
          "item1",
        ));

      it("shows the last selected item as active", async () =>
        assertActiveItem(
          html` <calcite-combobox selection-mode="multiple">
            <calcite-combobox-item selected value="item1" text-label="item1"></calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2" selected></calcite-combobox-item>
            <calcite-combobox-item selected value="item3" text-label="item3"></calcite-combobox-item>
          </calcite-combobox>`,
          "item3",
        ));
    });

    describe("ancestors-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          html` <calcite-combobox selection-mode="ancestors">
            <calcite-combobox-item value="item1" text-label="parent">
              <calcite-combobox-item value="item1_1" text-label="item1_1"></calcite-combobox-item>
            </calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2"></calcite-combobox-item>
            <calcite-combobox-item value="item3" text-label="item3"></calcite-combobox-item>
          </calcite-combobox>`,
          "item1",
        ));

      it("shows the last selected item as active", async () =>
        assertActiveItem(
          html` <calcite-combobox selection-mode="ancestors">
            <calcite-combobox-item value="item1" text-label="parent" selected>
              <calcite-combobox-item value="item1_1" text-label="item1_1"></calcite-combobox-item>
            </calcite-combobox-item>
            <calcite-combobox-item value="item2" text-label="item2"></calcite-combobox-item>
            <calcite-combobox-item value="item3" text-label="item3" selected></calcite-combobox-item>
          </calcite-combobox>`,
          "item3",
        ));
    });
  });

  it("inheritable props: `selectionMode` and `scale` modified on the parent get passed to items", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-combobox label="Trees" value="Trees" scale="l" selection-mode="single">
        <calcite-combobox-item-group label="Conifers">
          <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);
    const comboboxItems = await page.findAll("calcite-combobox-items");

    comboboxItems.forEach(async (item) => {
      expect(await item.getProperty("selectionMode")).toBe("single");
      expect(await item.getProperty("scale")).toBe("l");
    });
  });

  describe("custom input value when clicked outside of the component", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
        </calcite-combobox>
      `);
    });

    async function assertClickOutside(selectionMode = "multiple", allowCustomValues = false): Promise<void> {
      const combobox = await page.find("calcite-combobox");
      combobox.setProperty("selectionMode", selectionMode);
      combobox.setProperty("allowCustomValues", allowCustomValues);
      const inputEl = await page.find(`#myCombobox >>> input`);

      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      const comboboxRect = await page.evaluate(() => {
        const comboboxEl = document.querySelector("#myCombobox");
        return comboboxEl.getBoundingClientRect().toJSON();
      });

      await inputEl.type("three");
      await page.waitForChanges();
      await page.mouse.move(10, 2 * comboboxRect.bottom);
      await page.mouse.down();
      await page.waitForChanges();
      await page.mouse.up();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).not.toBe("myCombobox");
      expect(await inputEl.getProperty("value")).toBe("");
      expect(await combobox.getProperty("value")).toBe(allowCustomValues ? "three" : "");
    }

    selectionModes.forEach((mode) => {
      it(`should clear input value when selectionMode=${mode} `, async () => {
        await assertClickOutside(mode);
      });

      it(`should not clear input value when selectionMode=${mode} with allowCustomValues`, async () => {
        await assertClickOutside(mode, true);
      });
    });
  });

  describe("custom input value on blur using keyboard", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-combobox id="myCombobox">
          <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
          <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
        </calcite-combobox>
      `);
    });

    async function clearInputValueOnBlur(selectionMode = "multiple", allowCustomValues = false): Promise<void> {
      const combobox = await page.find("calcite-combobox");
      combobox.setProperty("selectionMode", selectionMode);
      combobox.setProperty("allowCustomValues", allowCustomValues);
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");
      await page.keyboard.type("three");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await inputEl.getProperty("value")).toBe("");
      expect(await combobox.getProperty("value")).toBe(allowCustomValues ? "three" : "");
    }

    selectionModes.forEach((mode) => {
      it(`should clear the input on blur when selectionMode=${mode}`, async () => {
        await clearInputValueOnBlur(mode);
      });
      it(`should not clear the input on blur when selectionMode=${mode} with allowCustomValues`, async () => {
        await clearInputValueOnBlur(mode, true);
      });
    });
  });

  it("should not open combobox menu with spacebar while focusing on chip's close button", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-combobox label="test" placeholder="placeholder" max-items="10" scale="m">
        <calcite-combobox-item-group label="Pokemon">
          <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>
          <calcite-combobox-item value="Venusaur" text-label="Venusaur"></calcite-combobox-item>
          <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
          <calcite-combobox-item-group label="Cutest Pokemon">
            <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>
            <calcite-combobox-item value="Squirtle1" text-label="Squirtle1">
              <calcite-combobox-item value="Squirtle2" text-label="Squirtle2">
                <calcite-combobox-item value="Squirtle3" text-label="Squirtle3">
                  <calcite-combobox-item value="Squirtle4" text-label="Squirtle4"></calcite-combobox-item>
                </calcite-combobox-item>
              </calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);

    const combobox = await page.find("calcite-combobox");
    const openEvent = page.waitForEvent("calciteComboboxOpen");
    await combobox.click();
    await openEvent;

    await (await combobox.find("calcite-combobox-item[value=Pikachu]")).click();
    await (await combobox.find("calcite-combobox-item[value=Charizard]")).click();
    await (await combobox.find("calcite-combobox-item[value=Squirtle3]")).click();

    const chips = await page.findAll("calcite-combobox >>> calcite-chip");
    expect(chips.length).toBe(3);

    const closeEvent = page.waitForEvent("calciteComboboxClose");
    await combobox.press("Tab");
    await closeEvent;

    const close = await page.find("calcite-combobox >>> calcite-chip >>> .close");
    await close.press(" ");
    await page.waitForChanges();

    const remainingChips = await page.findAll("calcite-combobox >>> calcite-chip");
    expect(remainingChips.length).toBe(2);
    expect(await page.find("calcite-combobox")).not.toHaveAttribute("open");
  });

  it("prevents toggling items when combobox is closed", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-combobox label="test" placeholder="placeholder" max-items="10" scale="m">
        <calcite-combobox-item-group label="Pokemon">
          <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>
          <calcite-combobox-item value="Venusaur" text-label="Venusaur"></calcite-combobox-item>
          <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
          <calcite-combobox-item-group label="Cutest Pokemon">
            <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>
            <calcite-combobox-item value="Squirtle1" text-label="Squirtle1">
              <calcite-combobox-item value="Squirtle2" text-label="Squirtle2"> </calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox-item-group>
      </calcite-combobox>
    `);

    const combobox = await page.find("calcite-combobox");
    await combobox.click();
    expect(await page.find("calcite-combobox")).toHaveAttribute("open");

    await (await combobox.find("calcite-combobox-item[value=Pikachu]")).click();
    await (await combobox.find("calcite-combobox-item[value=Charizard]")).click();

    const chips = await page.findAll("calcite-combobox >>> calcite-chip");
    expect(chips.length).toBe(2);

    await combobox.click();
    expect(await page.find("calcite-combobox")).not.toHaveAttribute("open");

    await combobox.press("Enter");
    expect(chips.length).toBe(2);
    await combobox.press("Enter");
    expect(chips.length).toBe(2);
  });

  it("prevents opening a readonly combobox", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-combobox id="myCombobox" read-only>
        <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
        <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
        <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
        <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
      </calcite-combobox>
    `);

    const combobox = await page.find("calcite-combobox");
    await combobox.click();
    await page.waitForChanges();

    expect(await combobox.getProperty("open")).toBe(false);
  });

  it("does not throw an error when a click emits on connect (#9321)", async () => {
    const page = await newProgrammaticE2EPage();
    await page.evaluate(async () => {
      const combobox = document.createElement("calcite-combobox");
      document.body.click();
      document.body.append(combobox);
    });
    await page.waitForChanges();
  });

  it("allow selecting an item that was previously disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-combobox>
        <calcite-combobox-item text-label="Item 1" value="one"></calcite-combobox-item>
        <calcite-combobox-item text-label="Item 2" value="two"></calcite-combobox-item>
        <calcite-combobox-item id="tres" text-label="Item 3" value="three" disabled></calcite-combobox-item>
      </calcite-combobox>
    `);
    const combobox = await page.find("calcite-combobox");

    await combobox.click();
    const item3 = await page.find("calcite-combobox-item[disabled]");
    await item3.click();

    expect(await combobox.getProperty("value")).toBe("");

    await item3.setProperty("disabled", false);
    await page.waitForChanges();

    await item3.click();

    expect(await combobox.getProperty("value")).toBe("three");
  });
});
