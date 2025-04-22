import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";
import { expect, it } from "vitest";
import { GlobalTestProps } from "../utils/puppeteer";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup, ComponentTag } from "./interfaces";

expect.extend(toHaveNoViolations);

type AxeOwningWindow = GlobalTestProps<{ axe: typeof axe }>;

/**
 * Helper for asserting that a component is accessible.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("accessible"), () => {
 *    accessible(`<calcite-tree></calcite-tree>`);
 * });
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test
 */
export function accessible(componentTestSetup: ComponentTestSetup): void {
  it("is accessible", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    await page.addScriptTag({ path: require.resolve("axe-core") });
    await page.waitForFunction(() => (window as AxeOwningWindow).axe);

    expect(
      await page.evaluate(async (componentTag: ComponentTag) => (window as AxeOwningWindow).axe.run(componentTag), tag),
    ).toHaveNoViolations();
  });
}
