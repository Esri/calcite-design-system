import { toHaveNoViolations } from "jest-axe";
import { expect, it, vi, Mock } from "vitest";
import { ComponentTestSetup } from "./interfaces";
import { getTagAndPage } from "./utils";

expect.extend(toHaveNoViolations);

/**
 * Helper for asserting that throttle has been cancelled when component is disconnected.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("throttleCancelled"), () => {
 *    throttleCancelled(`<color-picker></color-picker>`);
 * });
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test
 */
export function throttleCancelled(componentTestSetup: ComponentTestSetup): void {
  it("should cancel throttle when component is disconnected", async () => {
    const cancel = vi.fn();

    vi.mock("lodash/throttle", () => (fn: { cancel: Mock<any> }) => {
      fn.cancel = cancel;
      return cancel;
    });

    const { page, tag } = await getTagAndPage(componentTestSetup);

    await page.$eval(tag, (element: HTMLElement) => element.remove());

    expect(cancel).toHaveBeenCalledTimes(1);
  });
}
