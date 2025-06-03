// @ts-strict-ignore
import { E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { GlobalTestProps, newProgrammaticE2EPage, skipAnimations, toElementHandle } from "../utils/puppeteer";
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
 * Testing a component that has both `closed` and `collapsed` props.
 *
 * describe("openClose", () => {
 *   openClose("calcite-panel", {
 *     openPropName: "closed",
 *   });
 *   openClose("calcite-panel", {
 *     openPropName: "collapsed",
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

    await setUpEventListeners(tag, page, effectiveOptions.openPropName);
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
    await setUpEventListeners(tag, page, effectiveOptions.openPropName);
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
    await setUpEventListeners(tag, page, effectiveOptions.openPropName);
    await testOpenCloseEvents({
      animationsEnabled: !effectiveOptions.willUseFallback,
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
    await setUpEventListeners(tag, page, effectiveOptions.openPropName);
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
  const eventSequence = getEventSequence(tag, openPropName);

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
      (_openPropName: string, componentTagOrHTML: string) => {
        const component = document.createElement(componentTagOrHTML);
        component["open"] = true;
        document.body.append(component);
      },
      openPropName,
      tag,
    );

    const element = await page.find(tag);
    await page.waitForChanges();

    if (openPropName === "open" || openPropName === "expanded") {
      await beforeOpenOrExpandEvent;
      await openOrExpandEvent;
      assertEventSequence([1, 1, 0, 0]);

      element.setProperty(openPropName, false);

      await page.waitForChanges();
      await beforeCloseOrCollapseEvent;
      await closeOrCollapseEvent;

      assertEventSequence([1, 1, 1, 1]);
    } else if (openPropName === "closed" || openPropName === "collapsed") {
      element.setProperty(openPropName, true);
      await beforeCloseOrCollapseEvent;
      await closeOrCollapseEvent;
      assertEventSequence([1, 1, 1, 1]);
    }
  }

  const element = await page.find(tag);
  await page.waitForChanges();

  if (!startOpen) {
    assertEventSequence([0, 0, 0, 0]);

    element.setProperty(openPropName, true);
    await page.waitForChanges();

    if (openPropName === "open" || openPropName === "expanded") {
      await beforeOpenOrExpandEvent;
      await openOrExpandEvent;

      assertEventSequence([1, 1, 0, 0]);

      element.setProperty(openPropName, false);

      await page.waitForChanges();
      await beforeCloseOrCollapseEvent;
      await closeOrCollapseEvent;

      assertEventSequence([1, 1, 1, 1]);
    } else if (openPropName === "closed" || openPropName === "collapsed") {
      await beforeCloseOrCollapseEvent;
      await closeOrCollapseEvent;

      assertEventSequence([0, 0, 1, 1]);

      element.setProperty(openPropName, false);

      await page.waitForChanges();
      await beforeOpenOrExpandEvent;
      await openOrExpandEvent;

      assertEventSequence([1, 1, 1, 1]);
    }
  }

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

  const delayDeltaThreshold = 100; // smallest internal animation timing used
  const matcherName = animationsEnabled ? "toBeGreaterThan" : "toBeLessThanOrEqual";

  const eventPairs: [OpenCloseName, OpenCloseName][] = [
    ["beforeOpen", "open"],
    ["beforeClose", "close"],
    ["beforeExpand", "expand"],
    ["beforeCollapse", "collapse"],
  ];

  eventPairs.forEach(([beforeEvent, event]) => {
    if (timestamps[beforeEvent] !== undefined && timestamps[event] !== undefined) {
      const actualDifference = timestamps[event] - timestamps[beforeEvent];
      expect(actualDifference)[matcherName](delayDeltaThreshold);
    }
  });
}

type EventOrderWindow = GlobalTestProps<{ events: string[] }>;

function getEventSequence(componentTag: ComponentTag, openPropName: string): string[] {
  const camelCaseTag = componentTag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());

  const eventSuffixes =
    openPropName === "open" || openPropName === "closed"
      ? [`BeforeOpen`, `Open`, `BeforeClose`, `Close`]
      : openPropName === "expanded" || openPropName === "collapsed"
        ? [`BeforeExpand`, `Expand`, `BeforeCollapse`, `Collapse`]
        : [];
  return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
}

async function setUpEventListeners(componentTag: ComponentTag, page: E2EPage, openPropName: string): Promise<void> {
  await page.evaluate(
    (eventSequence: string[]) => {
      const receivedEvents: string[] = [];

      (window as EventOrderWindow).events = receivedEvents;

      eventSequence.forEach((eventType) => {
        document.addEventListener(eventType, (event) => {
          receivedEvents.push(event.type);
        });
      });
    },
    getEventSequence(componentTag, openPropName),
  );
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
