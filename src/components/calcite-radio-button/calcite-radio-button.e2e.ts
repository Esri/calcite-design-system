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

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="nonechecked" value="1"></calcite-radio-button>
      <calcite-radio-button name="nonechecked" value="2"></calcite-radio-button>
      <calcite-radio-button name="nonechecked" value="3"></calcite-radio-button>
    `);
    const radioButtons = await page.findAll('calcite-radio-button');
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(await radioButtons[i].getAttribute("checked")).toBe(null);
    }
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
    const spy = await element.spyOnEvent("calciteRadioButtonChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(2);
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

      expect(ariaChecked).toBe("false");

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
