import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

/**
 * Helper for asserting that a component is not visible when hidden
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("honors hidden attribute", () => {
 *    hidden(() => mount("calcite-accordion"))
 * });
 */
export async function hidden(setup: () => ReturnType<typeof mount>): Promise<void> {
  it("is hidden", async () => {
    const { el } = await setup();

    el.hidden = true;

    await expect.element(el).not.toBeVisible();
  });
}
