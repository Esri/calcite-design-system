import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden, accessible } from "../../tests/commonTests";
import { html } from "../../tests/utils";

describe("calcite-combobox", () => {
  it("renders", async () => renders("calcite-combobox"));
  it("honors hidden attribute", async () => hidden("calcite-combobox"));
  it("is accessible", async () =>
    accessible(`
      <calcite-combobox label="Trees" value="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      </calcite-combobox>
  `));

  it("should show the listbox when it receives focus", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-combobox>
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    </calcite-combobox>`);

    page.keyboard.press("Tab");
    await page.waitForChanges();

    const container = await page.find(`calcite-combobox >>> .popper-container`);
    const visible = await container.isVisible();
    expect(visible).toBe(true);
  });

  it("should filter the items in listbox when typing into the input", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-combobox>
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    </calcite-combobox>`);

    await page.keyboard.press("Tab");
    await page.keyboard.type("one");

    await page.evaluate(() => {
      const combobox = document.querySelector("calcite-combobox");
      const input = combobox.shadowRoot.querySelector("input");
      input.value = "one";
      input.dispatchEvent(new Event("input"));
    });

    const items = await page.findAll("calcite-combobox-item");
    await items[1].waitForNotVisible();
    const item1Visible = await items[0].isVisible();
    const item2Visible = await items[1].isVisible();

    expect(item1Visible).toBe(true);
    expect(item2Visible).toBe(false);
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

    const items = await page.findAll("calcite-combobox-item");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].isIntersectingViewport()).toBe(i < maxItems);
    }
  });

  describe("item selection", () => {
    it("should add/remove item to the selected items when an item is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-combobox>
        <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      </calcite-combobox>`);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const cbox = await page.find("calcite-combobox");
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

    it("clicking a chip should remove the selected item", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-combobox>
        <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      </calcite-combobox>`);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const cbox = await page.find("calcite-combobox");
      const item1 = await cbox.find("calcite-combobox-item[value=one]");
      await item1.click();

      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).not.toBeNull();

      await page.evaluate(() => {
        const combobox = document.querySelector("calcite-combobox");
        const chip = combobox.shadowRoot.querySelector("calcite-chip");
        const closeButton = chip.shadowRoot.querySelector(".close");

        (closeButton as HTMLElement).click();
      });

      await page.waitForChanges();

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();
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
  });

  describe("keyboard navigation", () => {
    it("should cycle through items on up/down arrows", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item id="one" value="one" text-label="one"></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );

      const eventSpy = await page.spyOnEvent("calciteLookupChange", "window");
      const item1 = await page.find("calcite-combobox-item#one");
      const item2 = await page.find("calcite-combobox-item#two");
      const item3 = await page.find("calcite-combobox-item#three");

      const input = await page.find("calcite-combobox >>> input");
      await input.click();
      expect(await item1.getProperty("active")).toBe(false);

      await input.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(true);

      await input.press("ArrowUp");
      expect(await item3.getProperty("active")).toBe(true);
      expect(await item1.getProperty("active")).toBe(false);

      await input.press("ArrowUp");
      expect(await item2.getProperty("active")).toBe(true);
      expect(await item3.getProperty("active")).toBe(false);

      await input.press("ArrowDown");
      await input.press("ArrowDown");
      expect(await item1.getProperty("active")).toBe(true);

      await input.press("Enter");
      expect(await item1.getProperty("selected")).toBe(true);
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await input.press("Enter");
      expect(await item1.getProperty("selected")).toBe(false);
      expect(eventSpy).toHaveReceivedEventTimes(2);
    });

    it("should delete last chip on Delete", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      let chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).not.toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("Backspace");
      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();
    });

    it("should cycle through chips on left/right keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-combobox>
            <calcite-combobox-item id="one" value="one" text-label="one" selected></calcite-combobox-item>
            <calcite-combobox-item id="two" value="two" text-label="two" selected></calcite-combobox-item>
            <calcite-combobox-item id="three" value="three" text-label="three" selected></calcite-combobox-item>
          </calcite-combobox>
        `
      );
      let chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips[0]).not.toBeNull();
      expect(chips[1]).not.toBeNull();
      expect(chips[2]).not.toBeNull();

      const box = await page.find("calcite-combobox");
      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("ArrowLeft");
      expect(chips[2]).toHaveClass("chip--active");

      await input.press("ArrowLeft");
      expect(await chips[1]).toHaveClass("chip--active");
      expect(chips[2]).not.toHaveClass("chip--active");

      await box.press("Delete");
      chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toEqual(2);
    });
  });
});
