import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";
import { expect, it } from "vitest";
import type { TestSetup } from "./types";

expect.extend(toHaveNoViolations);

/**
 * Helper for asserting that a component is accessible.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("accessible", () => {
 *   accessible(() => mount("calcite-tree"));
 * });
 */
export function accessible(setup: TestSetup): void {
  it("is accessible", async () => {
    const { el } = await setup();

    expect(await axe.run(el)).toHaveNoViolations();
  });
}
