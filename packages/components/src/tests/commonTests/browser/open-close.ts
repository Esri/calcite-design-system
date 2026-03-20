import { expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { GlobalTestProps } from "../../utils/interfaces";
import { ComponentTag, WithBeforeContent } from "../interfaces";
import { afterNextTask  } from "../../utils/timing";
import { waitForEvent } from "./utils";

type CollapseAxis = "horizontal" | "vertical";

interface OpenCloseOptions {
  /** When specified, testing will assert that the component is collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** Toggle property to test. Currently, either "open" or "expanded". */
  openPropName?: string;

  /** When `true`, the test will assert that the delays match those used when animation is disabled */
  willUseFallback?: boolean;

  tag?: string;
}

const defaultOptions: OpenCloseOptions = {
  openPropName: "open",
  willUseFallback: false,
};

/**
 * Helper to test openClose component setup.
 *
 * Note that this helper should be used within a `describe` block.
 *
 * @example
 *
 * describe("openClose", () => {
 *   openClose(() => mount("calcite-combobox"));
 *
 *   openClose.initial(() => mount("calcite-combobox", {
 *     afterConnect: async (el) => {
 *         // configure page before component is created and appended
 *       }
 *      })
 *    );
 * });
 */
export function openClose(setup: () => ReturnType<typeof mount>, options?: OpenCloseOptions): void {
  const effectiveOptions = { ...defaultOptions, ...options };
  it(`emits with animations enabled`, async () => {
    const style = document.createElement("style");
    style.innerHTML = `:root { --calcite-duration-factor: 3; }`;
    document.head.append(style);

    try {
      await testOpenCloseEvents({
        setup,
        tag: effectiveOptions.tag,
        animationsEnabled: !effectiveOptions.willUseFallback,
        collapsedOnClose: effectiveOptions.collapsedOnClose,
        openPropName: effectiveOptions.openPropName!,
      });
    } finally {
      style.remove();
    }
  });

  it(`emits with animations disabled`, async () => {
    await testOpenCloseEvents({
      setup,
      tag: effectiveOptions.tag,
      animationsEnabled: false,
      collapsedOnClose: effectiveOptions.collapsedOnClose,
      openPropName: effectiveOptions.openPropName!,
    });
  });
}

/**
 * Helper to test openClose component setup on initialization.
 */
openClose.initial = function openCloseInitial(
  setup: () => ReturnType<typeof mount>,
  options?: WithBeforeContent<OpenCloseOptions>,
): void {
  const effectiveOptions = {
    ...defaultOptions,
    ...options,
  } as const;

  it("emits on initialization with animations enabled", async () => {
    const style = document.createElement("style");
    style.innerHTML = `:root { --calcite-duration-factor: 3; }`;
    document.head.append(style);

    try {
      await testOpenCloseEvents({
        setup,
        animationsEnabled: true,
        openPropName: effectiveOptions.openPropName!,
      });
    } finally {
      style.remove();
    }
  });

  it("emits on initialization with animations disabled", async () => {
    await testOpenCloseEvents({
      setup,
      animationsEnabled: false,
      openPropName: effectiveOptions.openPropName!,
    });
  });
};

interface TestOpenCloseEventsParams {
  tag?: string;

  /**
   * The test setup function.
   */
  setup: () => ReturnType<typeof mount>;

  /** The property name used to control the open state of the component. */
  openPropName: string;

  /** Whether the component should be collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** Whether animations are enabled. */
  animationsEnabled: boolean;
}

async function testOpenCloseEvents({
  tag,
  setup,
  animationsEnabled,
  openPropName,
  collapsedOnClose,
}: TestOpenCloseEventsParams): Promise<void> {
  const timestamps: Record<OpenCloseName, number | undefined> = {
    beforeOpen: undefined,
    open: undefined,
    beforeClose: undefined,
    close: undefined,
  };

  let es: string[];
  let beforeOpenEvent: any;
  let openEvent: any;
  let beforeCloseEvent: any;
  let closeEvent: any;

  if (tag) {
    setUpEventListeners(tag as keyof DeclareElements);
    es = getEventSequence(tag as keyof DeclareElements);
    [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = await Promise.all(
      es.map(async (eventName) => {
        const eventSpy = vi.fn();
        document.addEventListener(eventName, eventSpy);
        return {
          listener: eventSpy,
          promise: waitForEvent(document.body, eventName),
        };
      }),
    );
  }

  const { el, reRender } = await setup();
  es = es!; // for type narrowing

  if (el[openPropName] && !tag) {
    throw new Error("testing initial open state requires component tag to be specified in options");
  }

  if (!tag) {
    const effectiveTag = el.localName as keyof DeclareElements;
    setUpEventListeners(effectiveTag);
    es = getEventSequence(effectiveTag);
    [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = await Promise.all(
      es.map(async (eventName) => {
        const eventSpy = vi.fn();
        document.addEventListener(eventName, eventSpy);
        return {
          listener: eventSpy,
          promise: waitForEvent(document.body, eventName),
        };
      }),
    );
  }

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

  const element = el;
  element[openPropName] = true;

  await reRender();
  await captureEventTimestamp(beforeOpenEvent.promise, es.at(0)!);
  await captureEventTimestamp(openEvent.promise, es.at(1)!);

  console.log("First");
  assertEventSequence([1, 1, 0, 0]);
  console.log("First done");

  element[openPropName] = false;
  await reRender();
  await captureEventTimestamp(beforeCloseEvent.promise, es.at(2)!);
  await captureEventTimestamp(closeEvent.promise, es.at(3)!);

  console.log("second");
  assertEventSequence([1, 1, 1, 1]);

  if (collapsedOnClose !== undefined) {
    const boundingBox = element.getBoundingClientRect();
    const horizontalCollapse = collapsedOnClose === "horizontal";
    const dimension = horizontalCollapse ? "width" : "height";
    const scrollDimension = horizontalCollapse ? "scrollWidth" : "scrollHeight";

    expect(boundingBox[dimension]).toBe(0);
    expect(element[scrollDimension]).toBe(0);
  }

  expect((window as EventOrderWindow).events).toEqual(es);

  const delayDeltaThreshold = 100; // smallest internal animation timing used
  const delayBetweenBeforeOpenAndOpen = timestamps.open! - timestamps.beforeOpen!;
  const delayBetweenBeforeCloseAndClose = timestamps.close! - timestamps.beforeClose!;

  const matcherName = animationsEnabled ? "toBeGreaterThan" : "toBeLessThanOrEqual";

  console.log("last");
  expect(delayBetweenBeforeOpenAndOpen)[matcherName](delayDeltaThreshold);
  expect(delayBetweenBeforeCloseAndClose)[matcherName](delayDeltaThreshold);
}

type EventOrderWindow = GlobalTestProps<{ events: string[] }>;

function getEventSequence(componentTag: ComponentTag): string[] {
  const camelCaseTag = componentTag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());
  const eventSuffixes = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`];

  return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
}

function setUpEventListeners(componentTag: ComponentTag): void {
  const eventSequence = getEventSequence(componentTag);
  const receivedEvents: string[] = [];

  (window as EventOrderWindow).events = receivedEvents;

  eventSequence.forEach((eventType) =>
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
