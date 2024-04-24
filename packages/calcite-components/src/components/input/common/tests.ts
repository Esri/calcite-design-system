/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/

import { newE2EPage } from "@stencil/core/testing";
import { isElementFocused } from "../../../tests/utils";
import { html } from "../../../../support/formatting";
import { JSX } from "../../../components";

export function testPostValidationFocusing(
  inputTag: Extract<keyof JSX.IntrinsicElements, "calcite-input" | "calcite-input-text" | "calcite-input-number">,
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

    const inputSelector = `${inputTag}[name=${inputName}]`;

    expect(await isElementFocused(page, inputSelector)).toBe(true);
    expect(await input.getProperty("value")).toBe("");

    const expectedValue = "12345"; // number works for both text and number types

    await page.keyboard.type(expectedValue);
    await page.waitForChanges();

    expect(await isElementFocused(page, inputSelector)).toBe(true);
    expect(await input.getProperty("value")).toBe(expectedValue);
  });
}

export function testHiddenInputSyncing(
  inputTag: Extract<
    keyof JSX.IntrinsicElements,
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

    // intentionally setting all props regardless of type for testing purposes
    input.setProperty("min", 0);
    input.setProperty("max", 10);
    input.setProperty("step", 1);
    input.setProperty("pattern", "test");
    input.setProperty("minLength", 0);
    input.setProperty("maxLength", 10);
    await page.waitForChanges();

    if (inputTag === "calcite-input") {
      // testing subset of types

      await input.setProperty("type", "text");
      await page.waitForChanges();

      await input.setProperty("type", "number");
      await page.waitForChanges();

      return;
    }

    if (inputTag === "calcite-input-text" || inputTag === "calcite-text-area") {
      return;
    }
  });
}
