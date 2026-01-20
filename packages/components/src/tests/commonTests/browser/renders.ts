import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { type Locator, page } from "vitest/browser";
import { HYDRATED_ATTR } from "../utils";

/**
 * Verifies that a component renders correctly.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("renders", () => {
 *    renders(() => mount("calcite-tree"));
 * });
 */
export async function renders(
  setup: () => ReturnType<typeof mount>,
  options?: {
    /**
     * The expected display style of the component. Defaults to "inline".
     */
    display?: string;

    /**
     * Whether the component is expected to be visible. Defaults to `true`.
     * If an object is provided, a custom locator can also be specified to check visibility.
     */
    visible?:
      | boolean
      | {
          /**
           * Whether the component is expected to be visible.
           */
          value: boolean;
          /**
           * A custom locator for the component under test.
           */
          locator: Locator;
        };
  },
): Promise<void> {
  it(`renders`, async () => {
    const { el } = await setup();

    await expect.element(el).toHaveAttribute(HYDRATED_ATTR);
    expect(getComputedStyle(el).display).toBe(options?.display ?? "inline");

    const visible = typeof options?.visible === "object" ? options.visible.value : (options?.visible ?? true);
    const locator =
      typeof options?.visible === "object" && options.visible.locator
        ? options.visible.locator
        : page.elementLocator(el);

    await (visible ? expect.element(locator).toBeVisible() : expect.element(locator).not.toBeVisible());
  });
}
