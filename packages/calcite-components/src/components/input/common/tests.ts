/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
import { LuminaJsx } from "@arcgis/lumina";
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { hiddenFormInputSlotName } from "../../../utils/form";
import { isElementFocused } from "../../../tests/utils";
import { html } from "../../../../support/formatting";

export function testPostValidationFocusing(
  inputTag: Extract<keyof LuminaJsx.IntrinsicElements, "calcite-input" | "calcite-input-text" | "calcite-input-number">,
): void {
  it("restores focus on invalid input if user continues typing", async () => {
    const page = await newE2EPage();
    const inputName = "test";

    await page.setContent(html`
        <form>
          <${inputTag} required name="${inputName}"></${inputTag}>
        </form>
        <script>
          const form = document.querySelector("form");
          form.addEventListener("submit", (event) => {
            event.preventDefault();
          });
        </script>
      `);

    const input = await page.find(inputTag);

    await input.callMethod("setFocus");
    await input.press("Enter");
    await page.waitForChanges();

    const hiddenInputSelector = `input[slot=${hiddenFormInputSlotName}]`;
    const inputSelector = `${inputTag}[name=${inputName}]`;

    expect(await isElementFocused(page, hiddenInputSelector)).toBe(false);
    expect(await isElementFocused(page, inputSelector)).toBe(true);
    expect(await input.getProperty("value")).toBe("");

    const expectedValue = "12345"; // number works for both text and number types

    await page.keyboard.type(expectedValue);
    await page.waitForChanges();

    expect(await isElementFocused(page, hiddenInputSelector)).toBe(false);
    expect(await isElementFocused(page, inputSelector)).toBe(true);
    expect(await input.getProperty("value")).toBe(expectedValue);
  });
}

export function testHiddenInputSyncing(
  inputTag: Extract<
    keyof LuminaJsx.IntrinsicElements,
    "calcite-input" | "calcite-input-text" | "calcite-input-number" | "calcite-text-area"
  >,
): void {
  it("syncs hidden input with the input component", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <form>
        <${inputTag} name="form-name"></${inputTag}>
      </form>
    `);
    const input = await page.find(inputTag);
    const hiddenInput = await page.find(`input[slot=${hiddenFormInputSlotName}]`);

    // intentionally setting all props regardless of type for testing purposes
    input.setProperty("min", 0);
    input.setProperty("max", 10);
    input.setProperty("step", 1);
    input.setProperty("pattern", "test");
    input.setProperty("minLength", 0);
    input.setProperty("maxLength", 10);
    await page.waitForChanges();

    async function assertTextProps(): Promise<void> {
      expect(await hiddenInput.getProperty("type")).toBe("text");
      expect(await hiddenInput.getProperty("min")).toBe("");
      expect(await hiddenInput.getProperty("max")).toBe("");
      expect(await hiddenInput.getProperty("pattern")).toBe("test");
      expect(await hiddenInput.getProperty("minLength")).toBe(0);
      expect(await hiddenInput.getProperty("maxLength")).toBe(10);
    }

    async function assertNumericProps(): Promise<void> {
      expect(await hiddenInput.getProperty("type")).toBe("number");
      expect(await hiddenInput.getProperty("min")).toBe("0");
      expect(await hiddenInput.getProperty("max")).toBe("10");
      expect(await hiddenInput.getProperty("pattern")).toBe("");
      expect(await hiddenInput.getProperty("minLength")).toBe(-1);
      expect(await hiddenInput.getProperty("maxLength")).toBe(-1);
    }

    if (inputTag === "calcite-input") {
      // testing subset of types

      await input.setProperty("type", "text");
      await page.waitForChanges();

      await assertTextProps();

      await input.setProperty("type", "number");
      await page.waitForChanges();

      await assertNumericProps();
      return;
    }

    if (inputTag === "calcite-input-text" || inputTag === "calcite-text-area") {
      await assertTextProps();
      return;
    }

    await assertNumericProps();
  });
}

export function testWorkaroundForGlobalPropRemoval(
  inputTag: Extract<keyof LuminaJsx.IntrinsicElements, "calcite-input" | "calcite-input-text" | "calcite-input-number">,
): void {
  const testInputMode = "tel";
  const testEnterKeyHint = "done";

  it("supports global attribute casing", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
        <${inputTag} autofocus inputmode="${testInputMode}" enterkeyhint="${testEnterKeyHint}"></${inputTag}>
    `);

    const input = await page.find(`${inputTag} >>> input`);

    expect(input.getAttribute("autofocus")).toBe("");
    expect(input.getAttribute("inputmode")).toBe(testInputMode);
    expect(input.getAttribute("enterkeyhint")).toBe(testEnterKeyHint);
  });

  it("supports global props", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<${inputTag}></${inputTag}>`);

    const input = await page.find(inputTag);
    const internalInput = await page.find(`${inputTag} >>> input`);

    input.setProperty("autofocus", true);
    input.setProperty("inputMode", testInputMode);
    input.setProperty("enterKeyHint", testEnterKeyHint);
    await page.waitForChanges();

    expect(internalInput.getAttribute("autofocus")).toBe("");
    expect(internalInput.getAttribute("inputmode")).toBe(testInputMode);
    expect(internalInput.getAttribute("enterkeyhint")).toBe(testEnterKeyHint);
  });
}
