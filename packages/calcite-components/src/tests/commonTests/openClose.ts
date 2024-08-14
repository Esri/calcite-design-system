import { E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { GlobalTestProps, newProgrammaticE2EPage } from "../utils";
import { getTag, simplePageSetup } from "./utils";
import { TagOrHTML } from "./interfaces";

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
   * Indicates the initial value of the toggle property.
   */
  initialToggleValue?: boolean;

  /**
   * Optional argument with functions to simulate user input (mouse or keyboard), to open or close the component.
   */
  beforeToggle?: BeforeToggle;

  /**
   * When `true`, the test will assert that the delays match those used when animation is disabled
   */
  willUseFallback?: boolean;
}

/**
 * Helper to test openClose component setup.
 *
 * Note that this helper should be used within a `describe` block.
 *
 * @example
 *
 * describe("openClose", () => {
 *   openClose("calcite-combobox", {
 *     beforeToggle: {
 *        open: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *        close: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *      }
 *   });
 *
 *  openClose("calcite-combobox", {
 *        initialToggleValue: true,
 *        beforeToggle: {
 *          close: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *      }
 *    }
 * })
 *
 * @param componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {object} [options] - Additional options to assert.
 */

export function openClose(componentTagOrHTML: TagOrHTML, options?: OpenCloseOptions): void {
  const defaultOptions: OpenCloseOptions = {
    initialToggleValue: false,
    openPropName: "open",
    willUseFallback: false,
  };
  const customizedOptions = { ...defaultOptions, ...options };

  type EventOrderWindow = GlobalTestProps<{ events: string[] }>;
  const eventSequence = setUpEventSequence(componentTagOrHTML);

  function setUpEventSequence(componentTagOrHTML: TagOrHTML): string[] {
    const tag = getTag(componentTagOrHTML);

    const camelCaseTag = tag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());
    const eventSuffixes = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`];

    return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
  }

  async function setUpPage(componentTagOrHTML: TagOrHTML, page: E2EPage): Promise<void> {
    await page.evaluate(
      (eventSequence: string[], initialToggleValue: boolean, openPropName: string, componentTagOrHTML: string) => {
        const receivedEvents: string[] = [];

        (window as EventOrderWindow).events = receivedEvents;

        eventSequence.forEach((eventType) => {
          document.addEventListener(eventType, (event) => receivedEvents.push(event.type));
        });

        if (!initialToggleValue) {
          return;
        }

        const component = document.createElement(componentTagOrHTML);
        component[openPropName] = true;

        document.body.append(component);
      },
      eventSequence,
      customizedOptions.initialToggleValue,
      customizedOptions.openPropName,
      componentTagOrHTML,
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

  async function testOpenCloseEvents(
    componentTagOrHTML: TagOrHTML,
    page: E2EPage,
    animationsEnabled = true,
  ): Promise<void> {
    const tag = getTag(componentTagOrHTML);
    const element = await page.find(tag);

    const timestamps: Record<OpenCloseName, number> = {
      beforeOpen: undefined,
      open: undefined,
      beforeClose: undefined,
      close: undefined,
    };

    const [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = eventSequence.map((event) => {
      return page.waitForEvent(event).then((spy) => {
        timestamps[toOpenCloseName(event)] = Date.now();
        return spy;
      });
    });

    const [beforeOpenSpy, openSpy, beforeCloseSpy, closeSpy] = await Promise.all(
      eventSequence.map(async (event) => await element.spyOnEvent(event)),
    );

    function assertEventSequence(expectedTimesPerEvent: [number, number, number, number]): void {
      expect(beforeOpenSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[0]);
      expect(openSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[1]);
      expect(beforeCloseSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[2]);
      expect(closeSpy).toHaveReceivedEventTimes(expectedTimesPerEvent[3]);
    }

    await page.waitForChanges();

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.open(page);
    } else {
      element.setProperty(customizedOptions.openPropName, true);
    }

    await page.waitForChanges();
    await beforeOpenEvent;
    await openEvent;

    assertEventSequence([1, 1, 0, 0]);

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.close(page);
    } else {
      element.setProperty(customizedOptions.openPropName, false);
    }

    await page.waitForChanges();
    await beforeCloseEvent;
    await closeEvent;

    assertEventSequence([1, 1, 1, 1]);

    expect(await page.evaluate(() => (window as EventOrderWindow).events)).toEqual(eventSequence);

    const delayDeltaThreshold = 100; // smallest internal animation timing used
    const delayBetweenBeforeOpenAndOpen = timestamps.open - timestamps.beforeOpen;
    const delayBetweenBeforeCloseAndClose = timestamps.close - timestamps.beforeClose;

    const matcherName = animationsEnabled ? "toBeGreaterThan" : ("toBeLessThanOrEqual" as const);

    expect(delayBetweenBeforeOpenAndOpen)[matcherName](delayDeltaThreshold);
    expect(delayBetweenBeforeCloseAndClose)[matcherName](delayDeltaThreshold);
  }

  if (customizedOptions.initialToggleValue === true) {
    it("emits on initialization with animations enabled", async () => {
      const page = await newProgrammaticE2EPage();
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 2; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page, !customizedOptions.willUseFallback);
    });

    it("emits on initialization with animations disabled", async () => {
      const page = await newProgrammaticE2EPage();
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page, false);
    });
  } else {
    it(`emits with animations enabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 2; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page, !customizedOptions.willUseFallback);
    });

    it(`emits with animations disabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page, false);
    });
  }
}
