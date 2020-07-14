import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden, accessible } from "../../tests/commonTests";

describe("calcite-combobox", () => {
  it("renders", async () => renders("calcite-combobox"));
  it("honors hidden attribute", async () => hidden("calcite-combobox"));
  it("is accessible", async () =>
    accessible(`
      <calcite-combobox aria-label="Trees" label="Trees" value="Trees" text-label="Trees">
        <calcite-combobox-item aria-label="Pine" value="Pine" text-label="Pine"></calcite-combobox-item>
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

    const listBox = await page.find(`calcite-combobox >>> #listbox`);
    const listBoxVisible = await listBox.isVisible();
    expect(listBoxVisible).toBe(true);
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

    it.skip("clicking a chip should remove the selected item", async () => {
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
      // TODO: below double piercing selector not working.
      // https://github.com/ionic-team/stencil/issues/1530
      const closeBtn = await page.find(
        "calcite-combobox >>> calcite-chip >>> .close"
      );
      console.log(closeBtn);
      await closeBtn.click();
      await page.waitForChanges();

      chip = await page.find("calcite-combobox >>> calcite-chip");
      expect(chip).not.toBeDefined();
    });
    it("should work with keyboard input", async () => {});
  });
});
