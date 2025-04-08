// @ts-strict-ignore

import { E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { GlobalTestProps, newProgrammaticE2EPage, skipAnimations, toElementHandle } from "../utils";
import { getBeforeContent, getTagAndPage, noopBeforeContent } from "./utils";
import { ComponentTag, ComponentTestSetup, WithBeforeContent } from "./interfaces";

type CollapseAxis = "horizontal" | "vertical";

interface OpenCloseOptions {
  /** When specified, testing will assert that the component is collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** The container selector for test to assert that the content has closed or collapsed */
  containerSelector?: string;

  /** Toggle property to test "open" | "expanded" | "closed" | "collapsed" props. */
  openPropName?: string;

  /** When `true`, the test will assert that the delays match those used when animation is disabled */
  willUseFallback?: boolean;
}

const defaultOptions: OpenCloseOptions = {
  containerSelector: undefined,
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
 * Testing a component that has both `open` and `expanded` events.
 *
 * describe("openClose", () => {
 *   openClose("calcite-panel", {
 *     openPropName: "open",
 *   });
 *   openClose("calcite-panel", {
 *     openPropName: "expanded",
 *     containerSelector: "content-wrapper"
 *   });
 * });
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
      content: `:root { --calcite-duration-factor: 2; }`,
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
      content: `:root { --calcite-duration-factor: 2; }`,
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

  /** Toggle property to test "open" | "expanded" | "closed" | "collapsed" props. */
  openPropName?: string;

  /** Whether the component should start in the `open` or `expanded` state. */
  startOpen?: boolean;

  /** When specified, testing will assert that the component is collapsed (does not affect layout) along the specified axis when closed. */
  collapsedOnClose?: CollapseAxis;

  /** The container selector for test to assert that the content has closed or collapsed */
  containerSelector?: string;

  /** Whether animations are enabled. */
  animationsEnabled: boolean;
}

async function testOpenCloseEvents({
  animationsEnabled,
  containerSelector,
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
    beforeExpand: undefined,
    expand: undefined,
    beforeCollapse: undefined,
    collapse: undefined,
  };
  const eventSequence = getEventSequence(tag);

  const [beforeOpenOrExpandEvent, openOrExpandEvent, beforeCloseOrCollapseEvent, closeOrCollapseEvent] =
    eventSequence.map((event) => {
      return page.waitForEvent(event).then((spy) => {
        timestamps[toOpenCloseName(event)] = Date.now();
        return spy;
      });
    });

  const [beforeOpenOrExpandEventSpy, openOrExpandSpy, beforeCloseOrCollapseSpy, closeOrCollapseSpy] = await Promise.all(
    eventSequence.map(async (event) => await page.spyOnEvent(event)),
  );

  function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
    expect(beforeOpenOrExpandEventSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[0]);
    expect(openOrExpandSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[1]);
    expect(beforeCloseOrCollapseSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[2]);
    expect(closeOrCollapseSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[3]);
  }

  if (startOpen) {
    await page.evaluate(
      (openPropName: string, componentTagOrHTML: string) => {
        const component = document.createElement(componentTagOrHTML);
        if (openPropName === "open") {
          component[openPropName] = true;
          document.body.append(component);
        } else if (openPropName === "expanded") {
          component["open"] = true;
          component[openPropName] = true;
          document.body.append(component);
        }
      },
      openPropName,
      tag,
    );
  }

  const element = await page.find(tag);
  await page.waitForChanges();

  if (!startOpen) {
    const isClosingProp = openPropName === "closed" || openPropName === "collapsed";
    element.setProperty(openPropName, !isClosingProp);
  }

  await page.waitForChanges();
  await beforeOpenOrExpandEvent;
  await openOrExpandEvent;

  assertEventSequence([1, 1, 0, 0]);

  const isClosingProp = openPropName === "closed" || openPropName === "collapsed";
  element.setProperty(openPropName, isClosingProp);

  await page.waitForChanges();
  await beforeCloseOrCollapseEvent;
  await closeOrCollapseEvent;

  assertEventSequence([1, 1, 1, 1]);

  if (collapsedOnClose !== undefined) {
    const elementHandle =
      openPropName === "expanded" || openPropName === "collapsed"
        ? await toElementHandle(await element.find(`.${containerSelector}`))
        : await toElementHandle(element);

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

  const eventSuffixes =
    this.openPropName === "open" || this.openPropName === "close"
      ? [`BeforeOpen`, `Open`, `BeforeClose`, `Close`]
      : this.openPropName === "expanded" || this.openPropName === "collapsed"
        ? [`BeforeExpand`, `Expand`, `BeforeCollapse`, `Collapse`]
        : [];

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

type OpenCloseName =
  | "beforeOpen"
  | "open"
  | "beforeClose"
  | "close"
  | "beforeExpand"
  | "expand"
  | "beforeCollapse"
  | "collapse";

function toOpenCloseName(eventName: string): OpenCloseName {
  return eventName.includes("BeforeOpen")
    ? "beforeOpen"
    : eventName.includes("Open")
      ? "open"
      : eventName.includes("BeforeClose")
        ? "beforeClose"
        : eventName.includes("Close")
          ? "close"
          : eventName.includes("BeforeExpand")
            ? "beforeExpand"
            : eventName.includes("Expand")
              ? "expand"
              : eventName.includes("BeforeCollapse")
                ? "beforeCollapse"
                : "collapse";
}
