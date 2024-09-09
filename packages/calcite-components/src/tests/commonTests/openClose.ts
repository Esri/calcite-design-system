import { E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { GlobalTestProps, newProgrammaticE2EPage } from "../utils";
import { getBeforeContent, getTagAndPage, noopBeforeContent } from "./utils";
import { ComponentTag, ComponentTestSetup, WithBeforeContent } from "./interfaces";

expect.extend(toHaveNoViolations);

interface BeforeToggle {
  /**
   * Function argument to simulate user input (mouse or keyboard), to open the component.
   */
  open: (page: E2EPage) => Promise<void>;

  /**
   * Function argument to simulate user input (mouse or keyboard), to close the component.
   */
  close: (page: E2EPage) => Promise<void>;
}

interface OpenCloseOptions {
  /**
   * Toggle property to test. Currently, either "open" or "expanded".
   */
  openPropName?: string;

  /**
   * Optional argument with functions to simulate user input (mouse or keyboard), to open or close the component.
   */
  beforeToggle?: BeforeToggle;

  /**
   * When `true`, the test will assert that the delays match those used when animation is disabled
   */
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
 *
 *
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
      tag,
      page,
      openPropName: effectiveOptions.openPropName,
      beforeToggle: effectiveOptions.beforeToggle,
      animationsEnabled: !effectiveOptions.willUseFallback,
    });
  });

  it(`emits with animations disabled`, async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    await page.addStyleTag({
      content: `:root { --calcite-duration-factor: 0; }`,
    });
    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: false,
      beforeToggle: effectiveOptions.beforeToggle,
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
      beforeToggle: effectiveOptions.beforeToggle,
      openPropName: effectiveOptions.openPropName,
      page,
      startOpen: true,
      tag,
    });
  });

  it("emits on initialization with animations disabled", async () => {
    const page = await newProgrammaticE2EPage();
    await page.addStyleTag({
      content: `:root { --calcite-duration-factor: 0; }`,
    });
    await beforeContent(page);
    await setUpEventListeners(tag, page);
    await testOpenCloseEvents({
      animationsEnabled: false,
      beforeToggle: effectiveOptions.beforeToggle,
      openPropName: effectiveOptions.openPropName,
      page,
      startOpen: true,
      tag,
    });
  });
};

interface TestOpenCloseEventsParams {
  /**
   * The component tag to test.
   */
  tag: ComponentTag;

  /**
   * The E2E page instance.
   */
  page: E2EPage;

  /**
   * The property name used to control the open state of the component.
   */
  openPropName: string;

  /**
   * Whether the component should start in the open state.
   */
  startOpen?: boolean;

  /**
   * Functions to simulate user input (mouse or keyboard) to open or close the component.
   */
  beforeToggle?: BeforeToggle;

  /**
   * Whether animations are enabled.
   */
  animationsEnabled: boolean;
}

async function testOpenCloseEvents({
  animationsEnabled,
  beforeToggle,
  openPropName,
  page,
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

  const [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = eventSequence.map((event) => {
    return page.waitForEvent(event).then((spy) => {
      timestamps[toOpenCloseName(event)] = Date.now();
      return spy;
    });
  });

  const [beforeOpenSpy, openSpy, beforeCloseSpy, closeSpy] = await Promise.all(
    eventSequence.map(async (event) => await page.spyOnEvent(event)),
  );

  function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
    expect(beforeOpenSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[0]);
    expect(openSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[1]);
    expect(beforeCloseSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[2]);
    expect(closeSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[3]);
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

  const element = await page.find(tag);
  await page.waitForChanges();

  if (!startOpen) {
    if (beforeToggle) {
      await beforeToggle.open(page);
    } else {
      element.setProperty(openPropName, true);
    }
  }

  await page.waitForChanges();
  await beforeOpenEvent;
  await openEvent;

  assertEventSequence([1, 1, 0, 0]);

  if (startOpen || !beforeToggle) {
    element.setProperty(openPropName, false);
  } else {
    await beforeToggle.close(page);
  }

  await page.waitForChanges();
  await beforeCloseEvent;
  await closeEvent;

  assertEventSequence([1, 1, 1, 1]);

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
