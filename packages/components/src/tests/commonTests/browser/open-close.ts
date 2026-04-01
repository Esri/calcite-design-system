import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { type SetRequired } from "type-fest";
import { kebabToPascal, uncapitalize } from "@arcgis/toolkit/string";
import { type ComponentTag } from "../interfaces";
import { afterNextTask } from "../../utils/timing";
import { waitForEvent } from "./utils";

type CollapseAxis = "horizontal" | "vertical";

interface OpenCloseOptions {
  /** When specified, testing will assert that the component is collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** Toggle property to test. Currently, either "open" or "expanded". */
  openPropName?: string;

  /** When `true`, the test will assert that the delays match those used when animation is disabled */
  willUseFallback?: boolean;
}

const defaultOptions: SetRequired<OpenCloseOptions, "openPropName" | "willUseFallback"> = {
  openPropName: "open",
  willUseFallback: false,
};

interface TestSetupMountOptions {
  /**
   * Helper required for initializing open/close events testing.
   */
  afterConnect: NonNullable<Parameters<typeof mount>[1]>["afterConnect"];
}

/**
 * Helper to test openClose component setup.
 *
 * Note that this helper should be used within a `describe` block.
 *
 * @example
 *
 * describe("openClose", () => {
 *   openClose(({ afterConnect }) => mount("calcite-combobox", afterConnect));
 * });
 */
export function openClose(
  setup: (mountOptions: TestSetupMountOptions) => ReturnType<typeof mount>,
  options?: OpenCloseOptions,
): void {
  const effectiveOptions = { ...defaultOptions, ...options };

  describe("it emits open/close events", () => {
    it(`emits with animations enabled`, async () => {
      const style = document.createElement("style");
      style.innerHTML = `:root { --calcite-duration-factor: 1; }`;
      document.head.append(style);

      try {
        await testOpenCloseEvents({
          setup,
          animationsEnabled: !effectiveOptions.willUseFallback,
          collapsedOnClose: effectiveOptions.collapsedOnClose,
          openPropName: effectiveOptions.openPropName,
          startOpen: false,
        });
      } finally {
        style.remove();
      }
    });

    it(`emits with animations disabled`, async () => {
      await testOpenCloseEvents({
        setup,
        animationsEnabled: false,
        collapsedOnClose: effectiveOptions.collapsedOnClose,
        openPropName: effectiveOptions.openPropName,
        startOpen: false,
      });
    });
  });

  describe("it emits open/close events when initially open", () => {
    it(`emits with animations enabled`, async () => {
      const style = document.createElement("style");
      style.innerHTML = `:root { --calcite-duration-factor: 1; }`;
      document.head.append(style);

      try {
        await testOpenCloseEvents({
          setup,
          animationsEnabled: !effectiveOptions.willUseFallback,
          collapsedOnClose: effectiveOptions.collapsedOnClose,
          openPropName: effectiveOptions.openPropName,
          startOpen: true,
        });
      } finally {
        style.remove();
      }
    });

    it(`emits with animations disabled`, async () => {
      await testOpenCloseEvents({
        setup,
        animationsEnabled: false,
        collapsedOnClose: effectiveOptions.collapsedOnClose,
        openPropName: effectiveOptions.openPropName,
        startOpen: true,
      });
    });
  });
}

interface TestOpenCloseEventsParams {
  /** Whether animations are enabled. */
  animationsEnabled: boolean;

  /** Whether the component should be collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** The property name used to control the open state of the component. */
  openPropName: string;

  /**
   * The test setup function.
   */
  setup: Parameters<typeof openClose>[0];

  /** Whether the component should start in the open state. */
  startOpen: boolean;
}

async function testOpenCloseEvents({
  setup,
  animationsEnabled,
  openPropName,
  collapsedOnClose,
  startOpen,
}: TestOpenCloseEventsParams): Promise<void> {
  const timestamps: Record<OpenCloseName, number | undefined> = {
    beforeOpen: undefined,
    open: undefined,
    beforeClose: undefined,
    close: undefined,
  };
  let eventSequence: string[];
  let afterConnectCalled = false;
  let beforeOpenEvent: Awaited<{ listener: any; promise: Promise<void> }>;
  let openEvent: Awaited<{ listener: any; promise: Promise<void> }>;
  let beforeCloseEvent: Awaited<{ listener: any; promise: Promise<void> }>;
  let closeEvent: Awaited<{ listener: any; promise: Promise<void> }>;

  const receivedEvents: string[] = [];

  const { el, reRender } = await setup({
    afterConnect: async (el) => {
      const tag = el.tagName as ComponentTag;
      afterConnectCalled = true;

      setUpEventListeners(tag, receivedEvents);
      eventSequence = getEventSequence(tag);

      [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = eventSequence.map((eventName) => {
        const eventSpy = vi.fn();
        document.addEventListener(eventName, eventSpy);

        return {
          listener: eventSpy,
          promise: waitForEvent(document.body, eventName),
        };
      });

      el[openPropName] = startOpen;
    },
  });

  if (!afterConnectCalled) {
    throw new Error(
      "Test `afterConnect` was not set on `mount` options. This test requires a custom `afterConnect` to be used. See test helper doc for example setup.",
    );
  }

  eventSequence = eventSequence!; // for type narrowing

  await afterNextTask(); // wait for next task for transitions to properly start
  await afterNextTask(); // wait for next task for transitions to properly start

  function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
    expect(beforeOpenEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[0]);
    expect(openEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[1]);
    expect(beforeCloseEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[2]);
    expect(closeEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[3]);
  }

  async function captureEventTimestamp(eventPromise: Promise<void>, eventName: string): Promise<void> {
    await eventPromise;
    timestamps[toOpenCloseName(eventName)] = Date.now();
  }

  if (!startOpen) {
    el[openPropName] = true;
  }

  await reRender();
  await captureEventTimestamp(beforeOpenEvent!.promise, eventSequence.at(0)!);
  await captureEventTimestamp(openEvent!.promise, eventSequence.at(1)!);

  assertEventSequence([1, 1, 0, 0]);

  el[openPropName] = false;

  await reRender();
  await captureEventTimestamp(beforeCloseEvent!.promise, eventSequence.at(2)!);
  await captureEventTimestamp(closeEvent!.promise, eventSequence.at(3)!);

  assertEventSequence([1, 1, 1, 1]);

  if (collapsedOnClose !== undefined) {
    const boundingBox = el.getBoundingClientRect();
    const horizontalCollapse = collapsedOnClose === "horizontal";
    const dimension = horizontalCollapse ? "width" : "height";
    const scrollDimension = horizontalCollapse ? "scrollWidth" : "scrollHeight";

    expect(boundingBox[dimension]).toBe(0);
    expect(el[scrollDimension]).toBe(0);
  }

  expect(receivedEvents).toEqual(eventSequence);

  const delayDeltaThreshold = 100; // smallest internal animation timing used
  const delayBetweenBeforeOpenAndOpen = timestamps.open! - timestamps.beforeOpen!;
  const delayBetweenBeforeCloseAndClose = timestamps.close! - timestamps.beforeClose!;

  const matcherName = animationsEnabled ? "toBeGreaterThan" : "toBeLessThanOrEqual";

  expect(delayBetweenBeforeOpenAndOpen)[matcherName](delayDeltaThreshold);
  expect(delayBetweenBeforeCloseAndClose)[matcherName](delayDeltaThreshold);
}

function getEventSequence(componentTag: ComponentTag): string[] {
  const camelCaseTag = uncapitalize(kebabToPascal(componentTag.toLowerCase()));
  const eventSuffixes = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`];

  return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
}

function setUpEventListeners(componentTag: ComponentTag, receivedEvents: string[]): void {
  getEventSequence(componentTag).forEach((eventType) =>
    document.addEventListener(eventType, (event) => receivedEvents.push(event.type)),
  );
}

type OpenCloseName = "beforeOpen" | "open" | "beforeClose" | "close";

function toOpenCloseName(eventName: string): OpenCloseName {
  return eventName.includes("BeforeOpen")
    ? "beforeOpen"
    : eventName.includes("Open")
      ? "open"
      : eventName.includes("BeforeClose")
        ? "beforeClose"
        : "close";
}
