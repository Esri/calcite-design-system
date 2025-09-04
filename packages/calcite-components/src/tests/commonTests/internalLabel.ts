// @ts-strict-ignore
import { expect, it } from "vitest";
import { CSS } from "../../components/functional/InternalLabel";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup } from "./interfaces";

/**
 * Helper to test InternalLabel functional component.
 * Verifies rendering and all configuration options.
 * Use within a describe block.
 *
 * @param componentTestSetup - The component tag, HTML, or the tag and e2e page for setting up a test.
 * @example
 * describe("InternalLabel", () => {
 *   internalLabel(`calcite-input`);
 * });
 */
export function internalLabel(componentTestSetup: ComponentTestSetup): void {
  it("renders label text (not for calcite-switch)", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    if (tag === "calcite-switch") {
      return;
    }
    const element = await page.find(tag);
    element.setProperty("labelText", "Test Label");
    await page.waitForChanges();
    const labelContainer = await page.find(`${tag} >>> .${CSS.container}`);
    expect(labelContainer).not.toBeNull();
    const labelText = await page.find(`${tag} >>> .${CSS.text}`);
    expect(labelText).not.toBeNull();
    expect(labelText.textContent).toContain("Test Label");
  });

  it("renders label text start (only for calcite-switch)", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    if (tag !== "calcite-switch") {
      return;
    }
    const element = await page.find(tag);
    element.setProperty("labelTextStart", "Test Label Start");
    await page.waitForChanges();
    const labelTextStart = await page.find(`${tag} >>> .${CSS.container}`);
    expect(labelTextStart).not.toBeNull();
    expect(labelTextStart.textContent).toContain("Test Label Start");
  });

  it("renders label text end (only for calcite-switch)", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    if (tag !== "calcite-switch") {
      return;
    }
    const element = await page.find(tag);
    element.setProperty("labelTextEnd", "Test Label End");
    await page.waitForChanges();
    const labelTextEnd = await page.find(`${tag} >>> .${CSS.container}`);
    expect(labelTextEnd).not.toBeNull();
    expect(labelTextEnd.textContent).toContain("Test Label End");
  });

  it("renders required indicator when required is true (not for calcite-radio-button or calcite-switch)", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    if (tag === "calcite-radio-button" || tag === "calcite-switch") {
      return;
    }
    const element = await page.find(tag);
    element.setProperty("labelText", "Required Label");
    element.setProperty("required", true);
    await page.waitForChanges();
    const requiredIndicator = await page.find(`${tag} >>> .${CSS.requiredIndicator}`);
    expect(requiredIndicator).not.toBeNull();
    expect(requiredIndicator.textContent).toBe("*");
  });

  it("renders tooltip text on required indicator (not for calcite-radio-button or calcite-switch)", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    if (tag === "calcite-radio-button" || tag === "calcite-switch") {
      return;
    }
    const element = await page.find(tag);
    element.setProperty("labelText", "Tooltip Label");
    element.setProperty("required", true);
    await page.waitForChanges();
    const requiredIndicator = await page.find(`${tag} >>> .${CSS.requiredIndicator}`);
    expect(requiredIndicator).not.toBeNull();
    expect(requiredIndicator.getAttribute("title")).toBe("Required");
  });
}
