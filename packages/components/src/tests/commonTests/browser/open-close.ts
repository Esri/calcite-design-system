import { expect, it, vi } from "vitest";
import { mount, RenderResult } from "@arcgis/lumina-compiler/testing";
import { LitElement } from "@arcgis/lumina";
import { GlobalTestProps } from "../../utils/interfaces";
import { ComponentTag, WithBeforeContent } from "../interfaces";
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
      const renderResult = await setup();
      await setUpEventListeners(renderResult.el.localName as keyof DeclareElements);
      await testOpenCloseEvents({
        animationsEnabled: !effectiveOptions.willUseFallback,
        collapsedOnClose: effectiveOptions.collapsedOnClose,
        openPropName: effectiveOptions.openPropName!,
        renderResult,
      });
    } finally {
      style.remove();
    }
  });

  it(`emits with animations disabled`, async () => {
    const renderResult = await setup();
    await setUpEventListeners(renderResult.el.localName as keyof DeclareElements);
    await testOpenCloseEvents({
      animationsEnabled: false,
      collapsedOnClose: effectiveOptions.collapsedOnClose,
      openPropName: effectiveOptions.openPropName!,
      renderResult,
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
      const renderResult = await setup();
      await setUpEventListeners(renderResult.el.localName as keyof DeclareElements);
      await testOpenCloseEvents({
        animationsEnabled: true,
        openPropName: effectiveOptions.openPropName!,
        startOpen: true,
        renderResult,
      });
    } finally {
      style.remove();
    }
  });

  it("emits on initialization with animations disabled", async () => {
    const renderResult = await setup();

    await setUpEventListeners(renderResult.el.localName as keyof DeclareElements);
    await testOpenCloseEvents({
      animationsEnabled: false,
      openPropName: effectiveOptions.openPropName!,
      renderResult,
      startOpen: true,
    });
  });
};

interface TestOpenCloseEventsParams {
  /**
   * The result of `mount` used for testing
   */
  renderResult: RenderResult<LitElement>;

  /** The property name used to control the open state of the component. */
  openPropName: string;

  /** Whether the component should start in the open state. */
  startOpen?: boolean;

  /** Whether the component should be collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** Whether animations are enabled. */
  animationsEnabled: boolean;
}

async function testOpenCloseEvents({
  renderResult,
  animationsEnabled,
  openPropName,
  collapsedOnClose,
  startOpen = false,
}: TestOpenCloseEventsParams): Promise<void> {
  const timestamps: Record<OpenCloseName, number | undefined> = {
    beforeOpen: undefined,
    open: undefined,
    beforeClose: undefined,
    close: undefined,
  };
  const tag = renderResult.el.localName as keyof DeclareElements;
  const eventSequence = getEventSequence(tag);

  const [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = await Promise.all(
    eventSequence.map(async (eventName) => {
      const eventSpy = vi.fn();
      document.addEventListener(eventName, eventSpy);
      return {
        listener: eventSpy,
        promise: waitForEvent(document.body, eventName),
      };
    }),
  );

  function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
    expect(beforeOpenEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[0]);
    expect(openEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[1]);
    expect(beforeCloseEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[2]);
    expect(closeEvent.listener).toHaveBeenCalledTimes(expectedTimesPerEvent[3]);
  }

  if (startOpen) {
    const component = document.createElement(tag);
    component[openPropName] = true;

    document.body.append(component);
  }

  async function captureEventTimestamp(eventPromise: Promise<void>, eventName: string): Promise<void> {
    await eventPromise;
    timestamps[toOpenCloseName(eventName)] = Date.now();
  }

  const element = renderResult.el;

  if (!startOpen) {
    element[openPropName] = true;
  }
  await renderResult.reRender();
  await captureEventTimestamp(beforeOpenEvent.promise, eventSequence.at(0)!);
  await captureEventTimestamp(openEvent.promise, eventSequence.at(1)!);

  assertEventSequence([1, 1, 0, 0]);

  element[openPropName] = false;
  await renderResult.reRender();
  await captureEventTimestamp(beforeCloseEvent.promise, eventSequence.at(2)!);
  await captureEventTimestamp(closeEvent.promise, eventSequence.at(3)!);

  assertEventSequence([1, 1, 1, 1]);

  if (collapsedOnClose !== undefined) {
    const boundingBox = element.getBoundingClientRect();
    const horizontalCollapse = collapsedOnClose === "horizontal";
    const dimension = horizontalCollapse ? "width" : "height";
    const scrollDimension = horizontalCollapse ? "scrollWidth" : "scrollHeight";

    expect(boundingBox[dimension]).toBe(0);
    expect(element[scrollDimension]).toBe(0);
  }

  expect((window as EventOrderWindow).events).toEqual(eventSequence);

  const delayDeltaThreshold = 100; // smallest internal animation timing used
  const delayBetweenBeforeOpenAndOpen = timestamps.open! - timestamps.beforeOpen!;
  const delayBetweenBeforeCloseAndClose = timestamps.close! - timestamps.beforeClose!;

  const matcherName = animationsEnabled ? "toBeGreaterThan" : "toBeLessThanOrEqual";

  expect(delayBetweenBeforeOpenAndOpen)[matcherName](delayDeltaThreshold);
  expect(delayBetweenBeforeCloseAndClose)[matcherName](delayDeltaThreshold);
}

type EventOrderWindow = GlobalTestProps<{ events: string[] }>;

function getEventSequence(componentTag: ComponentTag): string[] {
  const camelCaseTag = componentTag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());
  const eventSuffixes = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`];

  return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
}

async function setUpEventListeners(componentTag: ComponentTag): Promise<void> {
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
