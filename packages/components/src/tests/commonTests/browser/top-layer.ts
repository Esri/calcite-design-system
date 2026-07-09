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
   * Defaults to all elements matching `[popover]`.
   *
   * If this locator resolves to multiple elements, provide `topLayerTargetSelector`
   * or a more specific `topLayerTarget` locator to avoid ambiguous assertions.
   */
  topLayerTarget?: Locator;

  /**
   * Selector used to pick a single top-layer target when `topLayerTarget` resolves to multiple elements.
   * The selector must match the top-layer host element itself.
   *
   * If omitted and multiple targets are found, the helper throws to avoid ambiguous assertions.
   */
  topLayerTargetSelector?: string;

  /**
   * Locator for the component whose open state is toggled.
   *
   * Defaults to the mounted component element.
   */
  componentTarget?: Locator;

  /**
   * Event name emitted when the component opens.
   *
   * Defaults to `${getEventPrefix(componentEl)}Open`.
   *
   * When set to `null`, no event wait is performed.
   */
  openEventName?: string | null;

  /**
   * Event name emitted when the component closes.
   *
   * Defaults to `${getEventPrefix(componentEl)}Close`.
   *
   * When set to `null`, no event wait is performed.
   */
  closeEventName?: string | null;

  /** When `true`, skips close-state assertions. Defaults to `false`. */
  skipCloseCheck?: boolean;

  /** When `true`, skips `topLayerDisabled` assertions. Defaults to `false`. */
  skipTopLayerDisabledCheck?: boolean;
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
    const componentElFromLocator = options?.componentTarget?.element();

    if (options?.componentTarget && !componentElFromLocator) {
      throw new Error("componentTarget did not resolve to an element.");
    }

    const componentEl = (componentElFromLocator ?? el) as HTMLElement & {
      [key: string]: unknown;
      topLayerDisabled?: boolean;
    };
    const targetLocator = options?.topLayerTarget ?? page.getBySelector("[popover]");
    const topLayerElements = targetLocator.elements();
    const topLayerTargetSelector = options?.topLayerTargetSelector;

    if (topLayerElements.length === 0) {
      throw new Error("No top-layer target found.");
    }

    if (topLayerElements.length > 1 && topLayerTargetSelector === undefined) {
      throw new Error(
        "Multiple top-layer targets found. Provide a specific topLayerTarget locator or set topLayerTargetSelector.",
      );
    }

    const matchingTopLayerElements =
      topLayerTargetSelector !== undefined
        ? topLayerElements.filter((topLayerElement) => topLayerElement.matches(topLayerTargetSelector))
        : topLayerElements;

    if (topLayerTargetSelector !== undefined && matchingTopLayerElements.length === 0) {
      throw new Error(`No top-layer host elements matched topLayerTargetSelector: ${topLayerTargetSelector}`);
    }

    if (topLayerTargetSelector !== undefined && matchingTopLayerElements.length > 1) {
      throw new Error(
        `Multiple top-layer host elements matched topLayerTargetSelector: ${topLayerTargetSelector}. Use a more specific selector.`,
      );
    }

    const [topLayerEl] = matchingTopLayerElements;
    const openEventName =
      options?.openEventName === null ? null : (options?.openEventName ?? `${getEventPrefix(componentEl)}Open`);
    const closeEventName =
      options?.closeEventName === null ? null : (options?.closeEventName ?? `${getEventPrefix(componentEl)}Close`);
    const skipCloseCheck = options?.skipCloseCheck ?? false;
    const skipTopLayerDisabledCheck = options?.skipTopLayerDisabledCheck ?? false;

    expect(isInTopLayer(topLayerEl)).toBe(false);

    const componentOpen = openEventName ? waitForEvent(componentEl, openEventName) : null;
    componentEl[openProp] = true;
    await componentOpen;
    await afterNextTask();

    expect(isInTopLayer(topLayerEl)).toBe(true);

    if (!skipCloseCheck) {
      const componentClose = closeEventName ? waitForEvent(componentEl, closeEventName) : null;
      componentEl[openProp] = false;
      await componentClose;
      await afterNextTask();
    } else {
      componentEl[openProp] = false;
      await afterNextTask();
    }

    const closedState = !skipCloseCheck ? isInTopLayer(topLayerEl) : undefined;
    expect(closedState).toBe(!skipCloseCheck ? false : undefined);

    const shouldAssertTopLayerDisabled = !skipTopLayerDisabledCheck && "topLayerDisabled" in componentEl;
    let topLayerDisabledState: boolean | null = null;

    if (shouldAssertTopLayerDisabled) {
      const componentOpen = openEventName ? waitForEvent(componentEl, openEventName) : null;
      componentEl.topLayerDisabled = true;
      componentEl[openProp] = true;
      await componentOpen;
      await afterNextTask();

      topLayerDisabledState = isInTopLayer(topLayerEl);
    }

    expect(topLayerDisabledState).toBe(shouldAssertTopLayerDisabled ? false : null);
  });
}
