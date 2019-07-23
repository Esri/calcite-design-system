import { newE2EPage } from "@stencil/core/testing";

describe("calcite-radio-group", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group></calcite-radio-group>");
    const element = await page.find("calcite-radio-group");

    expect(element).toBeDefined();
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1"></calcite-radio-group-item>
          <calcite-radio-group-item value="2"></calcite-radio-group-item>
          <calcite-radio-group-item value="3"></calcite-radio-group-item>
        </calcite-radio-group>`
    );
    const element = await page.find("calcite-radio-group");

    const selected = await element.getProperty("selectedItem");
    expect(selected).not.toBeDefined();
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2" checked>two</calcite-radio-group-item>
          <calcite-radio-group-item value="3" checked>three</calcite-radio-group-item>
        </calcite-radio-group>`
    );
    const element = await page.find("calcite-radio-group");

    const selected = await element.getProperty("selectedItem");
    expect(selected).toBeDefined();

    const selectedItems = await element.findAll(
      "calcite-radio-group-item[checked]"
    );
    expect(selectedItems).toHaveLength(1);

    const selectedValue = await selectedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  describe("keyboard navigation", () => {
    it("selects item with left and arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
      );
      const element = await page.find("calcite-radio-group");
      const spy = await element.spyOnEvent("calciteRadioGroupChange");

      const firstElement = await element.find(
        "calcite-radio-group-item[checked]"
      );
      await firstElement.click();
      await element.press("ArrowRight");
      await page.waitForChanges();

      let selected = await element.find("calcite-radio-group-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowRight");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowRight");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
    });

    it("has a hidden input for form compatibility", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-group name="grouped">
          <calcite-radio-group-item value="1">one</calcite-radio-group-item>
          <calcite-radio-group-item value="2" checked>two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
      );

      const hiddenInput = await page.find(
        `calcite-radio-group input[type="hidden"]`
      );
      expect(hiddenInput).toBeDefined();

      const hiddenInputValue = await hiddenInput.getAttribute("value");
      expect(hiddenInputValue).toBe("2");

      const hiddenInputName = await hiddenInput.getAttribute("name");
      expect(hiddenInputName).toBe("grouped");
    });

    it("selects item with up and down keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
      );
      const element = await page.find("calcite-radio-group");
      const spy = await element.spyOnEvent("calciteRadioGroupChange");

      const firstElement = await element.find(
        "calcite-radio-group-item[checked]"
      );
      await firstElement.click();
      await element.press("ArrowDown");
      let selected = await element.find("calcite-radio-group-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowDown");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowDown");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
    });
  });

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radiogroup'`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group></calcite-radio-group>");
      const element = await page.find("calcite-radio-group");

      const role = await element.getAttribute("role");
      expect(role).toEqualText("radiogroup");
    });
  });
});
