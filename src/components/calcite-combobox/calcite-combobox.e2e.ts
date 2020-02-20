import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden, accessible } from "../../tests/commonTests";

describe("calcite-pagination", () => {
  it("renders", async () => renders("calcite-combobox"));
  it("honors hidden attribute", async () => hidden("calcite-combobox"));
  it("is accessible", async () => accessible(`calcite-combobox`));

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

  });

  describe("item selection", () => {
    it("should add to the selected items when an item is clicked", async () => {

    });
    it("should remove an item from the selected items when a selected item is clicked", async () => {

    });
    it("should work with keyboard input", async () => {

    });
  });
});
