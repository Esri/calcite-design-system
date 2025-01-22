import { expect, it } from "vitest";
import { getTagAndPage, HYDRATED_ATTR } from "./utils";
import { ComponentTestSetup } from "./interfaces";

/**
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("renders", () => {
 *    renders(`<calcite-tree></calcite-tree>`);
 * });
 * @param componentTestSetup
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {object} options - additional options to assert
 * @param {string} options.visible - is the component visible
 * @param {string} options.display - is the component's display "inline"
 */
export async function renders(
  componentTestSetup: ComponentTestSetup,
  options?: {
    visible?: boolean;
    display: string;
  },
): Promise<void> {
  it(`renders`, async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(await element.isVisible()).toBe(options?.visible ?? true);
    expect((await element.getComputedStyle()).display).toBe(options?.display ?? "inline");
  });
}
