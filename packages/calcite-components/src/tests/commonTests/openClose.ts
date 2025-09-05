// @ts-strict-ignore
import { E2EPage, EventSpy } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { GlobalTestProps, newProgrammaticE2EPage, skipAnimations, toElementHandle } from "../utils/puppeteer";
import { getBeforeContent, getTagAndPage, noopBeforeContent } from "./utils";
import { ComponentTag, ComponentTestSetup, WithBeforeContent } from "./interfaces";

type CollapseAxis = "horizontal" | "vertical";

interface OpenCloseOptions {
  /** When specified, testing will assert that the component is collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** Toggle property to test. Currently, either "open" or "expanded". */
  openPropName?: string;

  /** When present, the test will assert that the delays match those used when animation is disabled */
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
 *   openClose("calcite-combobox");
 *   openClose.initial("calcite-combobox", {
 *     beforeContent: async (page: E2EPage) => {
 *       // configure page before component is created and appended
 *     }
 *   });
 * });
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 * @param {object} [options] - Additional options to assert.
 */
export function openClose(componentTestSetup: ComponentTestSetup, options?: OpenCloseOptions): void {
  const effectiveOptions = { ...defaultOptions, ...options };

  it(`emits with animations enabled`, async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    await page.addStyleTag({
      content: `:root { --calcite-duration-factor: 3; }`,
    });

    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: !effectiveOptions.willUseFallback,
      collapsedOnClose: effectiveOptions.collapsedOnClose,
      openPropName: effectiveOptions.openPropName,
      page,
      tag,
    });
  });

  it(`emits with animations disabled`, async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    await skipAnimations(page);
    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: false,
      collapsedOnClose: effectiveOptions.collapsedOnClose,
      openPropName: effectiveOptions.openPropName,
      page,
      tag,
    });
  });
}

/**
 * Helper to test openClose component setup on initialization.
 *
 * @param componentTag - The component tag to test.
 * @param options - Additional options to assert.
 */
openClose.initial = function openCloseInitial(
  componentTag: ComponentTag,
  options?: WithBeforeContent<OpenCloseOptions>,
): void {
  const effectiveOptions = {
    ...defaultOptions,
    beforeContent: noopBeforeContent,
    ...options,
  };

  const tag = componentTag;
  const beforeContent = getBeforeContent(effectiveOptions);

  it("emits on initialization with animations enabled", async () => {
    const page = await newProgrammaticE2EPage();
    await page.addStyleTag({
      content: `:root { --calcite-duration-factor: 3; }`,
    });
    await beforeContent(page);
    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: true,
      openPropName: effectiveOptions.openPropName,
      page,
      startOpen: true,
      tag,
    });
  });

  it("emits on initialization with animations disabled", async () => {
    const page = await newProgrammaticE2EPage();
    await skipAnimations(page);
    await beforeContent(page);
    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: false,
      openPropName: effectiveOptions.openPropName,
      page,
      startOpen: true,
      tag,
    });
  });
};

interface TestOpenCloseEventsParams {
  /** The component tag to test. */
  tag: ComponentTag;

  /** The E2E page instance. */
  page: E2EPage;

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
  animationsEnabled,
  openPropName,
  page,
  collapsedOnClose,
  startOpen = false,
  tag,
}: TestOpenCloseEventsParams): Promise<void> {
  const timestamps: Record<OpenCloseName, number> = {
    beforeOpen: undefined,
    open: undefined,
    beforeClose: undefined,
    close: undefined,
  };
  const eventSequence = getEventSequence(tag);

  const [beforeOpenEventSpy, openEventSpy, beforeCloseEventSpy, closeEventSpy] = await Promise.all(
    eventSequence.map(async (event) => await page.spyOnEvent(event)),
  );

  function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
    expect(beforeOpenEventSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[0]);
    expect(openEventSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[1]);
    expect(beforeCloseEventSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[2]);
    expect(closeEventSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[3]);
  }

  if (startOpen) {
    await page.evaluate(
      (openPropName: string, componentTagOrHTML: string) => {
        const component = document.createElement(componentTagOrHTML);
        component[openPropName] = true;

        document.body.append(component);
      },
      openPropName,
      tag,
    );
  }

  async function captureEventTimestamp(eventSpy: EventSpy, eventName: string): Promise<void> {
    await eventSpy.next();
    timestamps[toOpenCloseName(eventName)] = Date.now();
  }

  const element = await page.find(tag);

  if (!startOpen) {
    element.setProperty(openPropName, true);
  }
  await page.waitForChanges();
  await captureEventTimestamp(beforeOpenEventSpy, eventSequence.at(0));
  await captureEventTimestamp(openEventSpy, eventSequence.at(1));

  assertEventSequence([1, 1, 0, 0]);

  element.setProperty(openPropName, false);
  await page.waitForChanges();
  await captureEventTimestamp(beforeCloseEventSpy, eventSequence.at(2));
  await captureEventTimestamp(closeEventSpy, eventSequence.at(3));

  assertEventSequence([1, 1, 1, 1]);

  if (collapsedOnClose !== undefined) {
    const elementHandle = await toElementHandle(element);
    const boundingBox = await elementHandle.boundingBox();
    const horizontalCollapse = collapsedOnClose === "horizontal";
    const dimension = horizontalCollapse ? "width" : "height";
    const scrollDimension = horizontalCollapse ? "scrollWidth" : "scrollHeight";

    expect(boundingBox[dimension]).toBe(0);
    expect(await elementHandle.evaluate((el, scrollDimension) => el[scrollDimension], scrollDimension)).toBe(0);
  }

  expect(await page.evaluate(() => (window as EventOrderWindow).events)).toEqual(eventSequence);

  const delayDeltaThreshold = 100; // smallest internal animation timing used
  const delayBetweenBeforeOpenAndOpen = timestamps.open - timestamps.beforeOpen;
  const delayBetweenBeforeCloseAndClose = timestamps.close - timestamps.beforeClose;

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

async function setUpEventListeners(componentTag: ComponentTag, page: E2EPage): Promise<void> {
  await page.evaluate((eventSequence: string[]) => {
    const receivedEvents: string[] = [];

    (window as EventOrderWindow).events = receivedEvents;

    eventSequence.forEach((eventType) => {
      document.addEventListener(eventType, (event) => receivedEvents.push(event.type));
    });
  }, getEventSequence(componentTag));
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
