import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { selectText } from "../../tests/utils";
import { canConvertToHexa, isValidHex, normalizeHex } from "../color-picker/utils";
import { CSS } from "./resources";

describe("calcite-color-picker-hex-input", () => {
  describe("renders", () => {
    renders("calcite-color-picker-hex-input", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-color-picker-hex-input");
  });

  describe("accessible", () => {
    accessible("calcite-color-picker-hex-input");
    accessible("<calcite-color-picker-hex-input color='#c0ffee'></calcite-color-picker-hex-input>");
    accessible("<calcite-color-picker-hex-input allow-empty color=''></calcite-color-picker-hex-input>");
  });

  describe("defaults", () => {
    defaults("calcite-color-picker-hex-input", [
      {
        propertyName: "allowEmpty",
        defaultValue: false,
      },
      {
        propertyName: "alphaChannel",
        defaultValue: false,
      },
      {
        propertyName: "value",
        defaultValue: "#000000",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-color-picker-hex-input", [
      {
        propertyName: "value",
        value: "#ffffff",
      },
    ]);
  });

  describe("can be focused", () => {
    focusable("calcite-color-picker-hex-input");
  });

  it("supports no color", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input allow-empty></calcite-color-picker-hex-input>");

    const input = await page.find(`calcite-color-picker-hex-input`);
    input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(null);
    expect(input.getAttribute("value")).toBe(null);

    const internalInput = await page.find(`calcite-color-picker-hex-input >>> .${CSS.hexInput}`);
    expect(await internalInput.getProperty("value")).toBe("");
  });

  it("accepts shorthand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input></calcite-color-picker-hex-input>");

    const input = await page.find(`calcite-color-picker-hex-input`);
    input.setProperty("value", "#abc");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#aabbcc");
  });

  it("accepts shorthand hexa", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input alpha-channel></calcite-color-picker-hex-input>");

    const input = await page.find(`calcite-color-picker-hex-input`);
    input.setProperty("value", "#abcd");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#aabbccdd");
  });

  it("accepts longhand hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input></calcite-color-picker-hex-input>");

    const input = await page.find(`calcite-color-picker-hex-input`);
    input.setProperty("value", "#fafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafa");
  });

  it("accepts longhand hexa", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input alpha-channel></calcite-color-picker-hex-input>");

    const input = await page.find(`calcite-color-picker-hex-input`);
    input.setProperty("value", "#fafafafa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#fafafafa");
  });

  it("normalizes value when initialized", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input value='#f0f'></calcite-color-picker-hex-input>");
    const input = await page.find(`calcite-color-picker-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff");
  });

  it("normalizes hexa value when initialized", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-color-picker-hex-input alpha-channel value='#f0f0'></calcite-color-picker-hex-input>",
    );
    const input = await page.find(`calcite-color-picker-hex-input`);

    expect(await input.getProperty("value")).toBe("#ff00ff00");
  });

  it("ignores invalid hex", async () => {
    const hex = "#b33f33";
    const page = await newE2EPage();
    await page.setContent(`<calcite-color-picker-hex-input value='${hex}'></calcite-color-picker-hex-input>`);
    const input = await page.find(`calcite-color-picker-hex-input`);

    input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "wrong");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#a");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);
  });

  it("ignores invalid hexa", async () => {
    const hex = "#b33f33ff";
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-color-picker-hex-input alpha-channel value='${hex}'></calcite-color-picker-hex-input>`,
    );
    const input = await page.find(`calcite-color-picker-hex-input`);

    input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "wrong");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#a");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);

    input.setProperty("value", "#aaaaaaa");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe(hex);
  });

  it("emits event when color changes via user and not programmatically", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input value='#b33f33'></calcite-color-picker-hex-input>");

    const input = await page.find("calcite-color-picker-hex-input");
    const spy = await input.spyOnEvent("calciteColorPickerHexInputChange");

    input.setProperty("value", "#abcdef");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(0);

    await selectText(input);
    await page.keyboard.type("abc");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  it("prevents entering chars if invalid hex chars or it exceeds max hex length", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker-hex-input value='#b33f33'></calcite-color-picker-hex-input>");
    const input = await page.find("calcite-color-picker-hex-input");
    const selectAllText = async (): Promise<void> => await input.click({ clickCount: 3 });

    await selectAllText();
    await page.keyboard.type("zaaaz");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#aaaaaa");

    await selectAllText();
    await page.keyboard.type("bbbbbbc");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("#bbbbbb");
  });

  it("prevents entering chars if invalid hexa chars or it exceeds max hexa length", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-color-picker-hex-input alpha-channel value='#b33f33'></calcite-color-picker-hex-input>",
    );
    const input = await page.find("calcite-color-picker-hex-input");
    const blockedCharsAndLonghandHexa = "zabcdz";

    await selectText(input);
    await page.keyboard.type(blockedCharsAndLonghandHexa);
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    const expandedLonghandHexa = "#aabbccdd";
    expect(await input.getProperty("value")).toBe(expandedLonghandHexa);

    await selectText(input);
    const longhandHexWithExtraChars = "bbbbbbbbc";
    await page.keyboard.type(longhandHexWithExtraChars);
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    const hexWithPreviousAlphaCharsPreserved = "#bbbbbbdd";
    expect(await input.getProperty("value")).toBe(hexWithPreviousAlphaCharsPreserved);
  });

  describe("keyboard interaction", () => {
    let page: E2EPage;
    let input: E2EElement;

    async function assertTabAndEnterBehavior(
      hexInputChars: string,
      expectedValue: string | null,
      alphaChannel = false,
    ): Promise<void> {
      const normalizedInputHex = normalizeHex(hexInputChars);
      const resetHex = alphaChannel ? "#face0fff" : "#efface";

      if (normalizedInputHex === resetHex) {
        throw new Error(`input hex (${hexInputChars}) cannot be the same as reset value (${resetHex})`);
      }

      expectedValue =
        expectedValue === null ||
        (alphaChannel
          ? isValidHex(normalizedInputHex, true) || canConvertToHexa(normalizedInputHex)
          : isValidHex(normalizedInputHex))
          ? expectedValue
          : resetHex;

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
      await selectText(input);
      await page.keyboard.press("Backspace");
    }

    describe("when color value is required", () => {
      describe("hex", () => {
        const startingHex = "#b33f33";

        beforeEach(async () => {
          page = await newE2EPage();
          await page.setContent(
            `<calcite-color-picker-hex-input value=${startingHex}></calcite-color-picker-hex-input>`,
          );
          await page.waitForChanges();

          input = await page.find("calcite-color-picker-hex-input");
        });

        it("commits hex chars on Tab and Enter", async () => {
          await assertTabAndEnterBehavior("b00", "#bb0000");
          await assertTabAndEnterBehavior("c0ffee", "#c0ffee");
          await assertTabAndEnterBehavior("", startingHex);
        });

        it("prevents committing invalid hex values", async () => {
          await assertTabAndEnterBehavior("aabbc", startingHex);
          await assertTabAndEnterBehavior("aabb", startingHex);
          await assertTabAndEnterBehavior("aa", startingHex);
          await assertTabAndEnterBehavior("a", startingHex);
          await assertTabAndEnterBehavior("", startingHex);
        });

        it("allows nudging RGB channels with arrow keys (+/-1) and shift modifies amount (+/-10)", async () => {
          const initialHex = "#000000";

          await input.callMethod("setFocus");
          input.setProperty("value", initialHex);
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

          it("prevents committing invalid hex values", async () => {
            await assertTabAndEnterBehavior("aabbc", startingHex);
            await assertTabAndEnterBehavior("aabb", startingHex);
            await assertTabAndEnterBehavior("aa", startingHex);
            await assertTabAndEnterBehavior("a", startingHex);
            await assertTabAndEnterBehavior("", null);
          });

          it("restores previous value when a nudge key is pressed and no-color is allowed and set", async () => {
            const noColorValue = null;
            input.setProperty("value", noColorValue);
            await page.waitForChanges();
            await input.callMethod("setFocus");
            await page.waitForChanges();

            await page.keyboard.press("ArrowUp");
            await page.waitForChanges();
            expect(await input.getProperty("value")).toBe(startingHex);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();
            expect(await input.getProperty("value")).toBe(startingHex);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowUp");
            await page.keyboard.up("Shift");
            expect(await input.getProperty("value")).toBe(startingHex);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.up("Shift");
            expect(await input.getProperty("value")).toBe(startingHex);
          });
        });
      });

      describe("hexa", () => {
        const startingHexa = "#ff00ff00";

        beforeEach(async () => {
          page = await newE2EPage();
          await page.setContent(
            `<calcite-color-picker-hex-input alpha-channel value=${startingHexa}></calcite-color-picker-hex-input>`,
          );

          input = await page.find("calcite-color-picker-hex-input");
        });

        it.skip("commits hexa chars on Tab and Enter", async () => {
          await assertTabAndEnterBehavior("b00", "#bb0000ff", true);
          await assertTabAndEnterBehavior("abcd", "#aabbccdd", true);
          await assertTabAndEnterBehavior("c0ffee", "#c0ffeeff", true);
          await assertTabAndEnterBehavior("b0b0b0b0", "#b0b0b0b0", true);
          await assertTabAndEnterBehavior("", startingHexa, true);
        });

        it.skip("prevents committing invalid hexa values", async () => {
          await assertTabAndEnterBehavior("aabbccd", startingHexa, true);
          await assertTabAndEnterBehavior("aabbcc", "#aabbccff", true);
          await assertTabAndEnterBehavior("ff00f", "#aabbccff", true);
          await assertTabAndEnterBehavior("ff00", "#ffff0000", true);
          await assertTabAndEnterBehavior("aab", "#aaaabbff", true);
          await assertTabAndEnterBehavior("aa", "#aaaabbff", true);
          await assertTabAndEnterBehavior("a", "#aaaabbff", true);
          await assertTabAndEnterBehavior("", "#aaaabbff", true);
        });

        it("allows nudging RGB channels with arrow keys (+/-1) and shift modifies amount (+/-10)", async () => {
          const initialHex = "#000000ff";

          await input.callMethod("setFocus");
          input.setProperty("value", initialHex);
          await page.waitForChanges();

          await page.keyboard.press("ArrowUp");
          await page.waitForChanges();
          expect(await input.getProperty("value")).toBe("#010101ff");

          await page.keyboard.press("ArrowDown");
          await page.waitForChanges();
          expect(await input.getProperty("value")).toBe(initialHex);

          await page.keyboard.down("Shift");
          await page.keyboard.press("ArrowUp");
          await page.keyboard.up("Shift");
          expect(await input.getProperty("value")).toBe("#0a0a0aff");

          await page.keyboard.down("Shift");
          await page.keyboard.press("ArrowDown");
          await page.keyboard.up("Shift");
          expect(await input.getProperty("value")).toBe(initialHex);
        });

        describe("when empty is allowed", () => {
          beforeEach(async () => {
            input.setProperty("allowEmpty", true);
            await page.waitForChanges();
          });

          it.skip("commits hexa chars on Tab and Enter", async () => {
            await assertTabAndEnterBehavior("b00", "#bb0000ff", true);
            await assertTabAndEnterBehavior("baba", "#bbaabbaa", true);
            await assertTabAndEnterBehavior("c0ffee", "#c0ffeeff", true);
            await assertTabAndEnterBehavior("c0c0c0c0", "#c0c0c0c0", true);
            await assertTabAndEnterBehavior("", null, true);
          });

          it.skip("prevents committing invalid hexa values", async () => {
            await assertTabAndEnterBehavior("aabbccd", startingHexa, true);
            await assertTabAndEnterBehavior("aabbcc", "#aabbccff", true);
            await assertTabAndEnterBehavior("ff00f", "#aabbccff", true);
            await assertTabAndEnterBehavior("ff00", "#ffff0000", true);
            await assertTabAndEnterBehavior("aab", "#aaaabbff", true);
            await assertTabAndEnterBehavior("aa", "#aaaabbff", true);
            await assertTabAndEnterBehavior("a", "#aaaabbff", true);
            await assertTabAndEnterBehavior("", null, true);
          });

          it("restores previous value when a nudge key is pressed and no-color is allowed and set", async () => {
            const noColorValue = null;
            input.setProperty("value", noColorValue);
            await page.waitForChanges();
            await input.callMethod("setFocus");
            await page.waitForChanges();

            await page.keyboard.press("ArrowUp");
            await page.waitForChanges();
            expect(await input.getProperty("value")).toBe(startingHexa);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();
            expect(await input.getProperty("value")).toBe(startingHexa);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowUp");
            await page.keyboard.up("Shift");
            expect(await input.getProperty("value")).toBe(startingHexa);

            input.setProperty("value", noColorValue);
            await page.waitForChanges();

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.up("Shift");
            expect(await input.getProperty("value")).toBe(startingHexa);
          });
        });
      });
    });
  });
});
