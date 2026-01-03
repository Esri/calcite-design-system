import axe from "axe-core";
import { expect, it } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { mount } from "@arcgis/lumina-compiler/testing";

expect.extend(toHaveNoViolations);

/**
 * Helper for asserting that a component is accessible.
 *
 * Note that this helper should be used within a describe block.
 *
 * @param setup
 * @example
 * describe("accessible"), () => {
 *    accessible(`<calcite-tree></calcite-tree>`);
 * });
 */
export function accessible(setup: () => ReturnType<typeof mount>): void {
  it("is accessible", async () => {
    const { el } = await setup();

    expect(await axe.run(el.tagName)).toHaveNoViolations();
  });
}
