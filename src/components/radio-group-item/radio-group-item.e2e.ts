import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden } from "../../tests/commonTests";

describe("calcite-radio-group-item", () => {
  it("renders", () => renders("calcite-radio-group-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-radio-group-item"));

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group-item value='test-value'></calcite-radio-group-item>");
    const element = await page.find("calcite-radio-group-item");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
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

  it("renders icon at start if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-radio-group-item icon-start="car">Content</calcite-accordion-item>`);
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

      const role = element.getAttribute("role");

      expect(role).toEqualText("radio");
    });

    it(`updates 'aria-checked' based on 'checked' property`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group-item></calcite-radio-group-item>");
      const element = await page.find("calcite-radio-group-item");

      let ariaChecked = element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("false");

      element.setProperty("checked", true);
      await page.waitForChanges();

      ariaChecked = element.getAttribute("aria-checked");

      expect(ariaChecked).toEqualText("true");

      element.setProperty("checked", false);
      await page.waitForChanges();

      ariaChecked = element.getAttribute("aria-checked");

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
      expect(element).not.toHaveAttribute("icon-flip-rtl");
      expect(element).not.toHaveAttribute("value");
      expect(element).not.toHaveAttribute("icon-start");
      expect(element).not.toHaveAttribute("icon-end");
    });
  });
});
