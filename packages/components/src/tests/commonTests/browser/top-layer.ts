import { expect, it } from "vitest";
import { Locator, page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { isInTopLayer } from "../../utils/dom";
import { getEventPrefix, waitForEvent } from "./utils";

type TopLayerOptions = {
  /**
   * When `true`, the component delegates top-layer state to a nested owner.
   *
   * This disables open/close event waits and skips close-state assertions.
   */
  delegatedTopLayer?: boolean;

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
   */
  topLayerTarget?: Locator;

  /**
   * Locator for the component whose open state is toggled.
   *
   * Defaults to the mounted component element.
   */
  componentTarget?: Locator;

  /**
   * Locator for the component that emits open and close events.
   *
   * Defaults to `componentTarget`, or the mounted component element when `componentTarget` is omitted.
   */
  eventEmitter?: Locator;

  /**
   * Event name emitted when the component opens. Defaults to `${getEventPrefix(eventEmitter)}Open` using
   * `eventEmitter`, `componentTarget`, or the mounted component. When set to `null`, no event wait is performed.
   */
  openEventName?: string | null;

  /**
   * Event name emitted when the component closes. Defaults to `${getEventPrefix(eventEmitter)}Close` using
   * `eventEmitter`, `componentTarget`, or the mounted component. When set to `null`, no event wait is performed.
   */
  closeEventName?: string | null;

  /** When `true`, skips close-state assertions. Defaults to `false`. */
  skipCloseCheck?: boolean;
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
export async function topLayer(setUp: () => ReturnType<typeof mount>, options?: TopLayerOptions): Promise<void> {
  it("supports being placed in top layer", async () => {
    const { el, reRender } = await setUp();
    const openProp = options?.openProp ?? "open";
    const componentElFromLocator = options?.componentTarget?.element();
    const eventElFromLocator = options?.eventEmitter?.element();
    const hasUnresolvedComponentTarget = Boolean(options?.componentTarget && !componentElFromLocator);
    const hasUnresolvedEventEmitter = Boolean(options?.eventEmitter && !eventElFromLocator);

    expect(hasUnresolvedComponentTarget).toBe(false);
    expect(hasUnresolvedEventEmitter).toBe(false);

    const componentEl = (componentElFromLocator ?? el) as HTMLElement & {
      [key: string]: unknown;
      topLayerDisabled?: boolean;
    };
    const eventEl = (eventElFromLocator ?? componentEl) as HTMLElement;
    const targetLocator = options?.topLayerTarget ?? page.getBySelector("[popover]");
    const topLayerEl = targetLocator.element();
    const delegatedTopLayer = options?.delegatedTopLayer ?? false;
    const openEventName =
      delegatedTopLayer || options?.openEventName === null
        ? null
        : (options?.openEventName ?? `${getEventPrefix(eventEl)}Open`);
    const closeEventName =
      delegatedTopLayer || options?.closeEventName === null
        ? null
        : (options?.closeEventName ?? `${getEventPrefix(eventEl)}Close`);
    const skipCloseCheck = delegatedTopLayer || (options?.skipCloseCheck ?? false);

    async function expectTopLayerState(expectedState: boolean): Promise<boolean> {
      let currentState = false;
      await expect.poll(() => (currentState = isInTopLayer(topLayerEl))).toBe(expectedState);
      return currentState;
    }

    expect(isInTopLayer(topLayerEl)).toBe(false);

    const componentOpen = openEventName ? waitForEvent(eventEl, openEventName) : null;
    componentEl[openProp] = true;
    await componentOpen;
    await reRender();

    await expectTopLayerState(true);

    if (!skipCloseCheck) {
      const componentClose = closeEventName ? waitForEvent(eventEl, closeEventName) : null;
      componentEl[openProp] = false;
      await componentClose;
      await reRender();
    } else {
      componentEl[openProp] = false;
      await reRender();
    }

    const closedState = !skipCloseCheck ? await expectTopLayerState(false) : undefined;
    expect(closedState).toBe(!skipCloseCheck ? false : undefined);

    const shouldAssertTopLayerDisabled = "topLayerDisabled" in componentEl;
    const topLayerDisabledState = shouldAssertTopLayerDisabled
      ? await (async (): Promise<boolean> => {
          const componentOpen = openEventName ? waitForEvent(eventEl, openEventName) : null;
          componentEl.topLayerDisabled = true;
          componentEl[openProp] = true;
          await componentOpen;
          await reRender();

          return expectTopLayerState(false);
        })()
      : null;

    expect(topLayerDisabledState).toBe(shouldAssertTopLayerDisabled ? false : null);
  });
}
