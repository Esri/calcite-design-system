import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden, accessible, defaults } from "../../tests/commonTests";
import { html } from "../../tests/utils";

describe("calcite-combobox", () => {
  it("renders", async () => renders("calcite-combobox"));
  it("defaults", async () =>
    defaults("calcite-combobox", [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
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

  it("should show the listbox when it receives focus", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-combobox>
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    </calcite-combobox>`);

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const container = await page.find(`calcite-combobox >>> .popper-container`);
    const visible = await container.isVisible();
    expect(visible).toBe(true);
  });

  it.skip("should filter the items in listbox when typing into the input", async () => {
    const page = await newE2EPage({
      html: html` <calcite-combobox>
        <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      </calcite-combobox>`
    });

    const eventSpy = await page.spyOnEvent("calciteComboboxFilterChange");
    await page.keyboard.press("Tab");
    await page.keyboard.type("one");
    await page.waitForChanges();

    const items = await page.findAll("calcite-combobox-item");
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

    it("should select parent in ancestor selection mode", async () => {
      const page = await newE2EPage({
        html: `<calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item value="one" text-label="one">
            <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>`
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const cbox = await page.find("calcite-combobox");
      const item1 = await cbox.find("calcite-combobox-item[value=child1]");
      await item1.click();

      const parent = await cbox.find("calcite-combobox-item[value=one]");
      expect(parent).toBeDefined();
      expect(parent).toHaveAttribute("selected");

      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
    });

    it("should clear children in ancestor selection mode", async () => {
      const page = await newE2EPage({
        html: `<calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item value="parent" text-label="parent">
            <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
            <calcite-combobox-item value="child2" text-label="child2"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>`
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const cbox = await page.find("calcite-combobox");
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
            <calcite-combobox-item-group label="Last Item">
              <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
            </calcite-combobox-item-group>
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
            <calcite-combobox-item-group label="Last Item">
              <calcite-combobox-item id="three" value="three" text-label="three" selected></calcite-combobox-item>
            </calcite-combobox-item-group>
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

      const input = await page.find("calcite-combobox >>> input");
      await input.click();

      await input.press("K");
      await input.press("Enter");

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeDefined();
      expect(await chip.getProperty("value")).toBe("K");

      await input.click();

      await input.press("K");
      await input.press("Enter");
      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
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
        `
      );
      const chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).toBeNull();

      const input = await page.find("calcite-combobox >>> input");
      await input.click();
      await input.press("J");
      await input.press("Tab");
      const chips = await page.findAll("calcite-combobox >>> calcite-chip");
      expect(chips.length).toBe(1);
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
      await item1.click();
      await page.waitForChanges();
      const label = await page.find("calcite-combobox >>> .label");
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

      await page.keyboard.press("Tab");
      await page.waitForChanges();

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

      selected = await page.find("calcite-combobox >>> .selected-icon");
      let icon = await selected.getProperty("icon");
      expect(icon).toBe("banana");

      await element.click();

      await items[1].click();
      await page.waitForChanges();

      selected = await page.find("calcite-combobox >>> .selected-icon");
      icon = await selected.getProperty("icon");
      expect(icon).toBe("beaker");

      await element.click();

      await items[2].click();
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
});
