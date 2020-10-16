import { newE2EPage } from "@stencil/core/testing";

describe("calcite-radio-group-item", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");
    const element = await page.find("calcite-radio-group-item");

    expect(element).toBeDefined();
  });

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item value='test-value'></calcite-radio-group-item>");
    const element = await page.find("calcite-radio-group-item");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
  });

  it("emits when checked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item value='test-value'></calcite-radio-group-item>");
    const element = await page.find("calcite-radio-group-item");
    const spy = await element.spyOnEvent("calciteRadioGroupItemChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(2);
  });

  it("supports value, label and checked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item value='test-value' checked>test-label</calcite-radio-group-item>");
    const element = await page.find("calcite-radio-group-item");

    expect(element).toEqualText("test-label");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const value = await element.getProperty("value");
    expect(value).toBe("test-value");
  });

  it("uses value as fallback label", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item value='test-value' checked></calcite-radio-group-item>");

    const label = await page.find("calcite-radio-group-item >>> label");
    expect(label).toEqualText("test-value");
  });

  it("syncs w/ external inputs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-group-item><input type='radio' slot='input' value='1'></calcite-radio-group-item>"
    );
    const element = await page.find("calcite-radio-group-item");
    const label = await page.find("calcite-radio-group-item >>> label");

    expect(label).toEqualText("1");

    let checked = await element.getProperty("checked");
    expect(checked).toBe(false);

    const value = await element.getProperty("value");
    expect(value).toBe("1");

    await page.$eval("input", (input: HTMLInputElement) => {
      // need to toggle this way so MutationObserver kicks in
      input.toggleAttribute("checked");
    });

    checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const input = await page.find("input");
    element.setProperty("checked", false);
    await page.waitForChanges();
    checked = await input.getAttribute("checked");
    expect(checked).toBeNull();
  });

  it("renders icon if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-radio-group-item icon="car">Content</calcite-accordion-item>`);
    const icon = await page.find("calcite-radio-group-item >>> .radio-group-item-icon");
    expect(icon).not.toBe(null);
  });

  it("does not render icon if not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-radio-group-item>Content</calcite-accordion-item>`);
    const icon = await page.find("calcite-radio-group-item >>> .radio-group-item-icon");
    expect(icon).toBe(null);
  });

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radio'`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");
      const element = await page.find("calcite-radio-group-item");

      const role = await element.getAttribute("role");

      expect(role).toEqualText("radio");
    });

    it(`updates 'aria-checked' based on 'checked' property`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");
      const element = await page.find("calcite-radio-group-item");

      let ariaChecked = await element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("false");

      element.setProperty("checked", true);
      await page.waitForChanges();

      ariaChecked = await element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("true");

      element.setProperty("checked", false);
      await page.waitForChanges();

      ariaChecked = await element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("false");
    });

    it("content/value is wrapped by label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");
      const defaultSlot = await page.find("calcite-radio-group-item >>> label slot");

      expect(defaultSlot).toBeDefined();
    });

    it("renders default prop values", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");

      const element = await page.find("calcite-radio-group-item");
      expect(element).not.toHaveAttribute("checked");
      expect(element).not.toHaveAttribute("icon");
      expect(element).not.toHaveAttribute("icon-flip-rtl");
      expect(element).toEqualAttribute("icon-position", "start");
      expect(element).not.toHaveAttribute("value");
    });
  });
});
