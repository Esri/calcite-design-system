import { newE2EPage } from "@stencil/core/testing";
import { isElementFocused } from "../../../tests/utils";
import { hiddenFormInputSlotName } from "../../../utils/form";
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
