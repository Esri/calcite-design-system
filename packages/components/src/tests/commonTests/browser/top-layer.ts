import { expect, it } from "vitest";
import { Locator, page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterNextTask } from "../../utils/timing";
import { isInTopLayer } from "../../utils/dom";
import { getEventPrefix, waitForEvent } from "./utils";

type TopLayerOptions = {
  /**
   * Prop name for toggling the top-layer element.
   *
   * Defaults to "open".
   */
  openProp?: string;

  /**
   * Locator for the element that will be placed in the top layer.
   *
   * Defaults to first element with the popover attribute present.
   */
  topLayerTarget?: Locator;
};

/**
 * Helper to test a component's top layer placement.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("top layer placement", () => {
 *   topLayer("calcite-dialog");
 * });
 */
export async function topLayer(setup: () => ReturnType<typeof mount>, options?: TopLayerOptions): Promise<void> {
  it("supports being placed in top layer", async () => {
    const { el } = await setup();
    const openProp = options?.openProp ?? "open";
    const targetLocator = options?.topLayerTarget ?? page.getBySelector("[popover]");
    const topLayerEl = targetLocator.element();

    expect(isInTopLayer(topLayerEl)).toBe(false);

    const componentOpen = waitForEvent(el, `${getEventPrefix(el)}Open`);
    el[openProp] = true;
    await componentOpen;
    await afterNextTask();

    expect(isInTopLayer(topLayerEl)).toBe(true);

    const componentClose = waitForEvent(el, `${getEventPrefix(el)}Close`);
    el[openProp] = false;
    await componentClose;
    await afterNextTask();

    expect(isInTopLayer(topLayerEl)).toBe(false);

    if ("topLayerDisabled" in el) {
      const componentOpen = waitForEvent(el, `${getEventPrefix(el)}Open`);
      el.topLayerDisabled = true;
      el[openProp] = true;
      await componentOpen;
      await afterNextTask();

      // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on optional component feature
      expect(isInTopLayer(topLayerEl)).toBe(false);
    }
  });
}
