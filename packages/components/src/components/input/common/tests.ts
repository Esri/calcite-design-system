import { LuminaJsx } from "@arcgis/lumina";
import { E2EElement, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { html } from "../../../../support/formatting";

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

    const internalInput = await page.find(`${inputTag} >>> input`);

    expect(internalInput.getAttribute("autofocus")).toBe("");
    expect(internalInput.getAttribute("inputmode")).toBe(testInputMode);
    expect(internalInput.getAttribute("enterkeyhint")).toBe(testEnterKeyHint);

    const input = await page.find(inputTag);

    // we intentionally test each one to avoid renders caused by unrelated props affecting result
    await input.removeAttribute("autofocus");
    await page.waitForChanges();
    expect(internalInput.getAttribute("autofocus")).toBe(null);

    await input.removeAttribute("inputmode");
    await page.waitForChanges();
    expect(internalInput.getAttribute("inputmode")).toBe(getExpectedDefaultInputMode(input));

    await input.removeAttribute("enterkeyhint");
    await page.waitForChanges();
    expect(internalInput.getAttribute("enterkeyhint")).toBe("");
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

    // we intentionally test each one to avoid renders caused by unrelated props affecting result
    input.setProperty("autofocus", false);
    await page.waitForChanges();
    expect(internalInput.getAttribute("autofocus")).toBe(null);

    input.setProperty("inputMode", null);
    await page.waitForChanges();
    expect(internalInput.getAttribute("inputmode")).toBe(getExpectedDefaultInputMode(input));

    input.setProperty("enterKeyHint", null);
    await page.waitForChanges();
    expect(internalInput.getAttribute("enterkeyhint")).toBe("");
  });

  function getExpectedDefaultInputMode(input: E2EElement): string {
    return input.tagName === "CALCITE-INPUT-NUMBER" ? "decimal" : "";
  }
}
