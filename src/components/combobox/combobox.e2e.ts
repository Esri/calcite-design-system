import { E2EPage, newE2EPage } from "@stencil/core/testing";
import {
  renders,
  hidden,
  accessible,
  defaults,
  labelable,
  popperOwner,
  formAssociated,
  disabled
} from "../../tests/commonTests";

import { html } from "../../../support/formatting";
import { TEXT } from "./resources";

describe("calcite-combobox", () => {
  it("renders", async () => renders("calcite-combobox", { display: "block" }));
  it("defaults", async () =>
    defaults("calcite-combobox", [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      },
      {
        propertyName: "intlRemoveTag",
        defaultValue: TEXT.removeTag
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined
      }
    ]));
  it("honors hidden attribute", async () => hidden("calcite-combobox"));
  it("is accessible", async () =>
    accessible(`
      <calcite-combobox label="Trees" value="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      </calcite-combobox>
  `));

  it("is accessible with item group", async () =>
    accessible(`
      <calcite-combobox label="Trees" value="Trees">
        <calcite-combobox-item-group label="Conifers">
          <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
  `));

  it("is accessible with active selected items", async () =>
    accessible(`
      <calcite-combobox active label="Trees" value="Trees">
        <calcite-combobox-item-group label="Conifers">
          <calcite-combobox-item selected value="Pine" text-label="Pine"></calcite-combobox-item>
          <calcite-combobox-item selected value="Spruce" text-label="Spruce"></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
  `));

  it("is labelable", async () => labelable("calcite-combobox"));

  it("can be disabled", () => disabled("calcite-combobox"));

  it.skip("should filter the items in listbox when typing into the input", async () => {
    const page = await newE2EPage({
      html: html` <calcite-combobox>
        <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      </calcite-combobox>`
    });

    const items = await page.findAll("calcite-combobox-item");
    const eventSpy = await page.spyOnEvent("calciteComboboxFilterChange");
    await page.keyboard.press("Tab");
    await page.waitForEvent("calciteComboboxOpen");
    await page.keyboard.type("one");
    await items[1].waitForNotVisible();
    const item1Visible = await items[0].isVisible();
    const item2Visible = await items[1].isVisible();

    expect(item1Visible).toBe(true);
    expect(item2Visible).toBe(false);
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(await eventSpy.lastEvent.detail.visibleItems.length).toBe(1);
    expect(await eventSpy.lastEvent.detail.text).toBe("one");
  });

  it("should control max items displayed", async () => {
    const page = await newE2EPage();

    const maxItems = 7;

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
    await page.waitForChanges();

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
    await page.setContent(
      html`
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
      `
    );
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
    it("should add/remove item to the selected items when an item is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const cbox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await cbox.click();
      await openEvent;

      let item1 = await cbox.find("calcite-combobox-item[value=one]");
      await item1.click();

      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeDefined();

      item1 = await cbox.find("calcite-combobox-item[value=one]");
      await item1.click();
      await page.waitForChanges();

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();
    });

    it("should select parent in ancestor selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox selection-mode="ancestors">
            <calcite-combobox-item value="one" text-label="one">
              <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const cbox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await cbox.click();
      await openEvent;

      const item1 = await cbox.find("calcite-combobox-item[value=child1]");
      await item1.click();

      const parent = await cbox.find("calcite-combobox-item[value=one]");
      expect(parent).toBeDefined();
      expect(parent).toHaveAttribute("selected");

      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
    });

    it("should clear children in ancestor selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox selection-mode="ancestors">
            <calcite-combobox-item value="parent" text-label="parent">
              <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
              <calcite-combobox-item value="child2" text-label="child2"></calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const cbox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await cbox.click();
      await openEvent;

      const parent = await cbox.find("calcite-combobox-item[value=parent]");
      const parentItem = await cbox.find("calcite-combobox-item[value=parent] >>> li");
      const item1 = await cbox.find("calcite-combobox-item[value=child1]");
      const item2 = await cbox.find("calcite-combobox-item[value=child2]");
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
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const cbox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await cbox.click();
      await openEvent;

      const item1 = await cbox.find("calcite-combobox-item[value=one]");
      await item1.click();

      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).not.toBeNull();
      expect(await cbox.getProperty("active")).toBe(true);

      await page.evaluate(() => {
        const combobox = document.querySelector("calcite-combobox");
        const chip = combobox.shadowRoot.querySelector("calcite-chip");
        const closeButton = chip.shadowRoot.querySelector(".close");

        (closeButton as HTMLElement).click();
      });
      await page.waitForChanges();

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();
      expect(await cbox.getProperty("active")).toBe(false);
    });

    it("should honor calciteComboboxChipDismiss", async () => {
      const page = await newE2EPage({
        html: `<calcite-combobox>
        <calcite-combobox-item value="one" selected text-label="one"></calcite-combobox-item>
      </calcite-combobox>`
      });

      const eventSpy = await page.spyOnEvent("calciteComboboxChipDismiss", "window");

      const chip = await page.find("calcite-combobox >>> calcite-chip");

      chip.triggerEvent("calciteChipDismiss");

      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("should auto-select new custom value if selection is empty", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values selection-mode="single">
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await input.press("Escape");
      await page.waitForChanges();

      const item = await page.find("calcite-combobox-item:last-child");
      const label = await page.find("calcite-combobox >>> .label");

      expect(label.textContent).toBe("K");
      expect(eventSpy.lastEvent.detail.selectedItems.length).toBe(1);
      expect(await item.getProperty("selected")).toBe(true);
    });

    it("should replace current value to new custom value in single selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values selection-mode="single">
            <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await input.press("Escape");
      await page.waitForChanges();

      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item:last-child");
      const label = await page.find("calcite-combobox >>> .label");

      expect(label.textContent).toBe("K");
      expect(eventSpy.lastEvent.detail.selectedItems.length).toBe(1);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(true);
    });

    it("should auto-select new custom values in multi selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values>
            <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const input = await page.find("calcite-combobox >>> input");

      await input.click();
      await input.press("K");
      await input.press("Enter");
      await input.press("Escape");
      await page.waitForChanges();

      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item:last-child");
      const chips = await page.findAll("calcite-combobox >>> calcite-chip");

      expect(eventSpy.lastEvent.detail.selectedItems.length).toBe(3);
      expect(chips[2].textContent).toBe("K");
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(true);
      expect(await item3.getProperty("selected")).toBe(true);
    });
  });

  describe("keyboard navigation", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox id="myCombobox">
            <calcite-combobox-item id="one" value="one" label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" label="two"></calcite-combobox-item>
            <calcite-combobox-item-group label="Last Item">
              <calcite-combobox-item id="three" value="three" label="three"></calcite-combobox-item>
            </calcite-combobox-item-group>
          </calcite-combobox>
        `
      );
    });

    it("should not show the listbox when it receives focus", async () => {
      const input = await page.find(`#myCombobox >>> input`);
      await input.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      const container = await page.find(`#myCombobox >>> .popper-container`);
      const visible = await container.isVisible();
      expect(visible).toBe(false);
    });

    it("tab moves to next input, but doesn’t open the item group", async () => {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      const popper = await page.find("#myCombobox >>> .popper-container--active");
      expect(popper).toBeNull();
    });

    it("tab will close the item group if it’s open", async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      let popper = await page.find("#myCombobox >>> .popper-container--active");
      expect(popper).toBeTruthy();

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      popper = await page.find("#myCombobox >>> .popper-container--active");
      expect(popper).toBeNull();
    });

    it(`ArrowDown opens the item group for combobox in focus and jumps to the first item`, async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      const firstFocusedGroupItem = await page.find("#one >>> .label--active");
      expect(firstFocusedGroupItem).toBeTruthy();
    });

    it(`Escape closes the dropdown, but remains focused`, async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      let popper = await page.find("#myCombobox >>> .popper-container--active");
      expect(popper).toBeTruthy();

      await page.keyboard.press("Escape");
      await page.waitForChanges();
      popper = await page.find("#myCombobox >>> .popper-container--active");
      expect(popper).toBeNull();

      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");
    });

    it(`home opens dropdown and puts focus on first item`, async () => {
      const inputEl = await page.find(`#myCombobox >>> input`);
      await inputEl.focus();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("myCombobox");

      await page.keyboard.press("Home");
      await page.waitForChanges();
      const firstFocusedGroupItem = await page.find("#one >>> .label--active");
      expect(firstFocusedGroupItem).toBeTruthy();

      const visible = await firstFocusedGroupItem.isVisible();
      expect(visible).toBe(true);
    });

    it("should cycle through items on ArrowUp/ArrowDown and toggle selection on/off on Enter", async () => {
      const eventSpy = await page.spyOnEvent("calciteComboboxChange", "window");
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      const element = await page.find("calcite-combobox");
      await element.click();
      expect(await item1.getProperty("active")).toBe(false);

      await element.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(true);

      await element.press("ArrowUp");
      expect(await item3.getProperty("active")).toBe(true);
      expect(await item1.getProperty("active")).toBe(false);

      await element.press("ArrowUp");
      expect(await item2.getProperty("active")).toBe(true);
      expect(await item3.getProperty("active")).toBe(false);

      await element.press("ArrowDown");
      await element.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(true);

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
        expect(chips[0]).not.toBeNull();
        expect(chips[1]).not.toBeNull();
        expect(chips[2]).not.toBeNull();

        await element.click();

        await element.press("ArrowLeft");
        expect(chips[2]).toHaveClass("chip--active");

        await element.press("ArrowLeft");
        expect(await chips[1]).toHaveClass("chip--active");
        expect(chips[2]).not.toHaveClass("chip--active");

        await element.press("Delete");
        chips = await page.findAll("#myCombobox >>> calcite-chip");
        expect(chips.length).toEqual(2);
      });

      it("should delete last chip on Delete", async () => {
        expect(chips[0]).not.toBeNull();
        expect(chips[1]).not.toBeNull();
        expect(chips[2]).not.toBeNull();

        await element.click();

        await element.press("Backspace");
        chips = await page.findAll("#myCombobox >>> calcite-chip");
        expect(chips.length).toEqual(2);
      });
    });
  });

  describe("calciteComboboxChange", () => {
    it("should have 1 selectedItem when single select", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox selection-mode="single">
            <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );

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
      expect(eventSpy.lastEvent.detail.selectedItems.length).toBe(1);
    });

    it("should have 2 selectedItems when not in single select", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox selection-mode="multi">
            <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
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
      expect(eventSpy.lastEvent.detail.selectedItems.length).toBe(2);
    });
  });

  describe("allows free entry of text", () => {
    it("should allow typing a new unknown tag", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values>
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
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
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values>
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const eventSpy = await page.spyOnEvent("calciteComboboxChange");
      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("K");
      await input.press("Enter");
      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("should allow enter unknown tag when tabbing away", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values>
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
          <button>OK</button>
        `
      );
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      const button = await page.find("button");
      await input.click();
      await input.press("o");
      await input.press("Tab");
      let chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
      await input.press("j");
      await button.click();
      chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(2);
    });

    it("should select known tag when input", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox allow-custom-values>
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
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
      await page.setContent(
        html`
          <calcite-combobox selection-mode="single">
            <calcite-combobox-item id="one" value="one" text-label="One"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="Two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      const value = await input.getProperty("value");
      expect(value).toBe("");
      await input.click();

      const container = await page.find("calcite-combobox >>> .popper-container");
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
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
            <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const cbox = await page.find("calcite-combobox");
      const openEvent = page.waitForEvent("calciteComboboxOpen");
      await cbox.click();
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
      await page.setContent(
        html`
          <calcite-combobox selection-mode="single">
            <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
            <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
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

  it("respects the constant item property", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-combobox selection-mode="single">
        <calcite-combobox-item id="one" constant value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item id="two" value="two" text-label="Two"></calcite-combobox-item>
        <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
      </calcite-combobox>
    `);

    await page.waitForChanges();
    const input = await page.find("calcite-combobox >>> .wrapper");
    await input.click();
    await page.keyboard.type("two");
    await page.waitForChanges();
    const one = await (await page.find("#one")).isVisible();
    const two = await (await page.find("#two")).isVisible();
    const three = await (await page.find("#three")).isVisible();
    expect(one).toBeTruthy();
    expect(two).toBeTruthy();
    expect(three).toBeFalsy();
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
    expect(await combobox.getProperty("active")).toBeFalsy();
    await input.click();
    expect(await combobox.getProperty("active")).toBe(true);
  });

  it("is form-associated", () =>
    formAssociated(
      html`<calcite-combobox selection-mode="single">
        <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two" selected></calcite-combobox-item>
        <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
      </calcite-combobox>`,
      { testValue: "two" }
    ));

  it("owns a popper", () =>
    popperOwner(
      html` <calcite-combobox>
        <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two" selected></calcite-combobox-item>
        <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
      </calcite-combobox>`,
      "active",
      { shadowPopperSelector: ".popper-container" }
    ));
});
