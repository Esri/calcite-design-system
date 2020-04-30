import { newE2EPage } from "@stencil/core/testing";

describe("calcite-radio-button", () => {
  it("renders with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    expect(element).toBeDefined();
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light")
  });

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
  });

  it("emits when checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");
    const focusSpy = await element.spyOnEvent("calciteRadioButtonFocus");
    const blurSpy = await element.spyOnEvent("calciteRadioButtonBlur");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    expect(focusSpy).toHaveReceivedEventTimes(1);

    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(blurSpy).toHaveReceivedEventTimes(1);
  });

  it("supports value, label and checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value' checked>test-label</calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    expect(element).toEqualText("test-label");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const value = await element.getProperty("value");
    expect(value).toBe("test-value");
  });

  it("uses value as fallback label", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value' checked></calcite-radio-button>"
    );

    const label = await page.find("calcite-radio-button >>> calcite-label");
    expect(label).toEqualText("test-value");
  });

  it("syncs w/ external inputs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button><input type='radio' slot='input' value='1'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");
    const label = await page.find("calcite-radio-button >>> label");

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

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radio'`, async () => {
      const page = await newE2EPage();
      await page.setContent(
        "<calcite-radio-button></calcite-radio-button>"
      );
      const element = await page.find("calcite-radio-button");

      const role = await element.getAttribute("role");

      expect(role).toEqualText("radio");
    });

    it(`updates 'aria-checked' based on 'checked' property`, async () => {
      const page = await newE2EPage();
      await page.setContent(
        "<calcite-radio-button></calcite-radio-button>"
      );
      const element = await page.find("calcite-radio-button");

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
      await page.setContent(
        "<calcite-radio-button></calcite-radio-button>"
      );
      const defaultSlot = await page.find(
        "calcite-radio-button >>> label slot"
      );

      expect(defaultSlot).toBeDefined();
    });
  });
});
