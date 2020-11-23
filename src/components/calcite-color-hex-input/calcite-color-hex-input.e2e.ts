import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { isValidHex, normalizeHex } from "../calcite-color/utils";

describe("calcite-color-hex-input", () => {
  it("renders", () => renders("calcite-color-hex-input"));

  it("is accessible", () => accessible("calcite-color-hex-input"));

  it("has defaults", () =>
    defaults("calcite-color-hex-input", [
      {
        propertyName: "value",
        defaultValue: "#000000"
      }
    ]));

  it("reflects", () =>
    reflects("calcite-color-hex-input", [
      {
        propertyName: "value",
        value: "#ffffff"
      }
    ]));

  it("can be focused", async () => focusable("calcite-color-hex-input"));

  it("accepts shorthand hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-hex-input></calcite-color-hex-input>"
    });

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "#fff");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#ffffff");
  });

  it("accepts longhand hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-hex-input></calcite-color-hex-input>"
    });

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "#fafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafa");
  });

  it("normalizes value when initialized", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-hex-input value='#f0f'></calcite-color-hex-input>"
    });
    await page.waitForChanges();
    const input = await page.find(`calcite-color-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff");
  });

  it("ignores invalid hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-hex-input value='#b33f33'></calcite-color-hex-input>"
    });

    const input = await page.find(`calcite-color-hex-input`);
    await input.setProperty("value", "wrong");
    await page.waitForChanges();

    await input.setProperty("value", "#");
    await page.waitForChanges();

    await input.setProperty("value", "#a");
    await page.waitForChanges();

    await input.setProperty("value", "#aa");
    await page.waitForChanges();

    await input.setProperty("value", "#aaaa");
    await page.waitForChanges();

    await input.setProperty("value", "#aaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#b33f33");
  });

  it("emits event when color changes", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-hex-input value='#b33f33'></calcite-color-hex-input>"
    });

    const input = await page.find("calcite-color-hex-input");
    const spy = await input.spyOnEvent("calciteColorHexInputChange");

    await input.setProperty("value", "#abcdef");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  describe("keyboard interaction", () => {
    async function assertTabAndEnterBehavior(
      hexInputChars: string,
      expectedHex: string,
      resetHex = "#efface"
    ): Promise<void> {
      const normalizedInputHex = normalizeHex(hexInputChars);

      if (normalizedInputHex === resetHex) {
        throw new Error(`input hex (${hexInputChars}) cannot be the same as reset value (${resetHex})`);
      }

      expectedHex = isValidHex(normalizedInputHex) ? expectedHex : resetHex;

      await typeHexValue(resetHex, "Enter");
      expect(await input.getProperty("value")).toBe(resetHex);

      await typeHexValue(hexInputChars, "Enter");
      expect(await input.getProperty("value")).toBe(expectedHex);

      await typeHexValue(resetHex, "Enter");
      expect(await input.getProperty("value")).toBe(resetHex);

      await typeHexValue(hexInputChars, "Tab");
      expect(await input.getProperty("value")).toBe(expectedHex);
    }

    async function typeHexValue(text: string, commitKey: "Tab" | "Enter"): Promise<void> {
      await clearText();
      await input.type(text);
      await page.keyboard.press(commitKey);
      await page.waitForChanges();
    }

    async function clearText(): Promise<void> {
      await input.callMethod("setFocus");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
    }

    const startingHex = "#b33f33";

    let page: E2EPage;
    let input: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({
        html: `<calcite-color-hex-input value=${startingHex}></calcite-color-hex-input>`
      });

      input = await page.find("calcite-color-hex-input");
    });

    it("commits hex chars on Tab and Enter", async () => {
      await assertTabAndEnterBehavior("b00", "#bb0000");
      await assertTabAndEnterBehavior("c0ffee", "#c0ffee");
    });

    it("prevents committing invalid hex chars", async () => {
      await assertTabAndEnterBehavior("loooooooooooool", startingHex);
      await assertTabAndEnterBehavior("aabbc", startingHex);
      await assertTabAndEnterBehavior("aabb", startingHex);
      await assertTabAndEnterBehavior("aa", startingHex);
      await assertTabAndEnterBehavior("a", startingHex);
    });

    it("allows nudging RGB channels with arrow keys (+/-1) and shift modifies amount (+/-10)", async () => {
      const initialHex = "#000000";

      await input.callMethod("setFocus");
      await input.setProperty("value", initialHex);
      await page.waitForChanges();

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe("#010101");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe(initialHex);

      await page.keyboard.down("Shift");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.up("Shift");
      expect(await input.getProperty("value")).toBe("#0a0a0a");

      await page.keyboard.down("Shift");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.up("Shift");
      expect(await input.getProperty("value")).toBe(initialHex);
    });
  });
});
