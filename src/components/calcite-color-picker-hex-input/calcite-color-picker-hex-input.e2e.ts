import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { isValidHex, normalizeHex } from "../calcite-color-picker/utils";
import { CSS } from "./resources";
import { TEXT } from "../calcite-color-picker/resources";

describe("calcite-color-picker-hex-input", () => {
  it("renders", () => renders("calcite-color-picker-hex-input"));

  it("is accessible", async () => {
    await accessible("calcite-color-picker-hex-input");
    await accessible("<calcite-color-picker-hex-input color='#c0ffee'></calcite-color-picker-hex-input>");
    await accessible("<calcite-color-picker-hex-input allow-empty color=''></calcite-color-picker-hex-input>");
  });

  it("has defaults", () =>
    defaults("calcite-color-picker-hex-input", [
      {
        propertyName: "allowEmpty",
        defaultValue: false
      },
      {
        propertyName: "intlHex",
        defaultValue: TEXT.hex
      },
      {
        propertyName: "intlNoColor",
        defaultValue: TEXT.noColor
      },
      {
        propertyName: "value",
        defaultValue: "#000000"
      }
    ]));

  it("reflects", () =>
    reflects("calcite-color-picker-hex-input", [
      {
        propertyName: "value",
        value: "#ffffff"
      }
    ]));

  it("can be focused", async () => focusable("calcite-color-picker-hex-input"));

  it("supports no color", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker-hex-input allow-empty></calcite-color-picker-hex-input>"
    });

    const input = await page.find(`calcite-color-picker-hex-input`);
    await input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(null);
    expect(input.getAttribute("value")).toBe(null);

    const internalInput = await page.find(`calcite-color-picker-hex-input >>> .${CSS.input}`);
    expect(await internalInput.getProperty("value")).toBe("");

    const internalSwatch = await page.find(`calcite-color-picker-hex-input >>> .${CSS.preview}`);
    expect(internalSwatch).toBe(null);
  });

  it("accepts shorthand hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker-hex-input></calcite-color-picker-hex-input>"
    });

    const input = await page.find(`calcite-color-picker-hex-input`);
    await input.setProperty("value", "#fff");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#ffffff");
  });

  it("accepts longhand hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker-hex-input></calcite-color-picker-hex-input>"
    });

    const input = await page.find(`calcite-color-picker-hex-input`);
    await input.setProperty("value", "#fafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafa");
  });

  it("normalizes value when initialized", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker-hex-input value='#f0f'></calcite-color-picker-hex-input>"
    });
    await page.waitForChanges();
    const input = await page.find(`calcite-color-picker-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff");
  });

  it("ignores invalid hex", async () => {
    const hex = "#b33f33";
    const page = await newE2EPage({
      html: `<calcite-color-picker-hex-input value='${hex}'></calcite-color-picker-hex-input>`
    });
    const input = await page.find(`calcite-color-picker-hex-input`);

    await input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "wrong");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "#");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "#a");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "#aa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "#aaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    await input.setProperty("value", "#aaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);
  });

  it("emits event when color changes", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker-hex-input value='#b33f33'></calcite-color-picker-hex-input>"
    });

    const input = await page.find("calcite-color-picker-hex-input");
    const spy = await input.spyOnEvent("calciteColorPickerHexInputChange");

    await input.setProperty("value", "#abcdef");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  describe("keyboard interaction", () => {
    async function assertTabAndEnterBehavior(
      hexInputChars: string,
      expectedValue: string | null,
      resetHex = "#efface"
    ): Promise<void> {
      const normalizedInputHex = normalizeHex(hexInputChars);

      if (normalizedInputHex === resetHex) {
        throw new Error(`input hex (${hexInputChars}) cannot be the same as reset value (${resetHex})`);
      }

      expectedValue = expectedValue === null || isValidHex(normalizedInputHex) ? expectedValue : resetHex;

      await typeHexValue(resetHex, "Enter");
      expect(await input.getProperty("value")).toBe(resetHex);

      await typeHexValue(hexInputChars, "Enter");
      expect(await input.getProperty("value")).toBe(expectedValue);

      await typeHexValue(resetHex, "Enter");
      expect(await input.getProperty("value")).toBe(resetHex);

      await typeHexValue(hexInputChars, "Tab");
      expect(await input.getProperty("value")).toBe(expectedValue);
    }

    async function typeHexValue(text: string, commitKey: "Tab" | "Enter"): Promise<void> {
      await clearText();
      await input.type(text);
      await page.keyboard.press(commitKey);
      await page.waitForChanges();
    }

    async function clearText(): Promise<void> {
      await input.callMethod("setFocus");

      await page.$eval("calcite-color-picker-hex-input", (el: HTMLCalciteColorHexInputElement): void => {
        const input = el.shadowRoot?.querySelector("input");

        if (!input) {
          return;
        }

        const inputType = input.type;
        input.type = "text";
        input.setSelectionRange(input.value.length, input.value.length);
        input.type = inputType;
      });

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
        html: `<calcite-color-picker-hex-input value=${startingHex}></calcite-color-picker-hex-input>`
      });

      input = await page.find("calcite-color-picker-hex-input");
    });

    describe("when color value is required", () => {
      it("commits hex chars on Tab and Enter", async () => {
        await assertTabAndEnterBehavior("b00", "#bb0000");
        await assertTabAndEnterBehavior("c0ffee", "#c0ffee");
        await assertTabAndEnterBehavior("", startingHex);
      });

      it("prevents committing invalid hex chars", async () => {
        await assertTabAndEnterBehavior("loooooooooooool", startingHex);
        await assertTabAndEnterBehavior("aabbc", startingHex);
        await assertTabAndEnterBehavior("aabb", startingHex);
        await assertTabAndEnterBehavior("aa", startingHex);
        await assertTabAndEnterBehavior("a", startingHex);
        await assertTabAndEnterBehavior("", startingHex);
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

    describe("when empty is allowed", () => {
      beforeEach(async () => {
        input.setProperty("allowEmpty", true);
        await page.waitForChanges();
      });

      it("commits hex chars on Tab and Enter", async () => {
        await assertTabAndEnterBehavior("b00", "#bb0000");
        await assertTabAndEnterBehavior("c0ffee", "#c0ffee");
        await assertTabAndEnterBehavior("", null);
      });

      it("prevents committing invalid hex chars", async () => {
        await assertTabAndEnterBehavior("loooooooooooool", null);
        await assertTabAndEnterBehavior("aabbc", startingHex);
        await assertTabAndEnterBehavior("aabb", startingHex);
        await assertTabAndEnterBehavior("aa", startingHex);
        await assertTabAndEnterBehavior("a", startingHex);
        await assertTabAndEnterBehavior("", null);
      });

      it("does not allow nudging when no-color is allowed and set", async () => {
        const noColorValue = null;

        await input.callMethod("setFocus");
        await input.setProperty("value", noColorValue);
        await page.waitForChanges();

        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();
        expect(await input.getProperty("value")).toBe(noColorValue);

        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        expect(await input.getProperty("value")).toBe(noColorValue);

        await page.keyboard.down("Shift");
        await page.keyboard.press("ArrowUp");
        await page.keyboard.up("Shift");
        expect(await input.getProperty("value")).toBe(noColorValue);

        await page.keyboard.down("Shift");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.up("Shift");
        expect(await input.getProperty("value")).toBe(noColorValue);
      });
    });
  });
});
