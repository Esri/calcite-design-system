import { toHaveNoViolations } from "jest-axe";
import { ComponentTestSetup, getTagAndPage } from "./utils";

expect.extend(toHaveNoViolations);

/**
 * Helper for asserting that a component is not visible when hidden
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * @param componentTestSetup
 * describe("honors hidden attribute", () => {
 *    hidden("calcite-accordion")
 * });
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 */
export async function hidden(componentTestSetup: ComponentTestSetup): Promise<void> {
  it("is hidden", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);

    element.setAttribute("hidden", "");
    await page.waitForChanges();

    expect(await element.isVisible()).toBe(false);
  });
}
