import { E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { GlobalTestProps, newProgrammaticE2EPage, skipAnimations } from "../utils";
import { getTagAndPage } from "./utils";
import { ComponentTag, ComponentTestSetup } from "./interfaces";

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
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 * @param {object} [options] - Additional options to assert.
 */

export function openClose(componentTestSetup: ComponentTestSetup, options?: OpenCloseOptions): void {
  const defaultOptions: OpenCloseOptions = {
    initialToggleValue: false,
    openPropName: "open",
  };
  const customizedOptions = { ...defaultOptions, ...options };

  type EventOrderWindow = GlobalTestProps<{ events: string[] }>;

  async function testOpenCloseEvents(tag: ComponentTag, page: E2EPage): Promise<void> {
    const camelCaseTag = tag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());
    const eventSequence = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`].map((suffix) => `${camelCaseTag}${suffix}`);

    await setUpPage(tag, page);

    const element = await page.find(tag);

    const [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = eventSequence.map((event) =>
      page.waitForEvent(event),
    );

    const [beforeOpenSpy, openSpy, beforeCloseSpy, closeSpy] = await Promise.all(
      eventSequence.map(async (event) => await element.spyOnEvent(event)),
    );

    await page.waitForChanges();

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.open(page);
    } else {
      element.setProperty(customizedOptions.openPropName, true);
    }

    await page.waitForChanges();

    await beforeOpenEvent;
    await openEvent;

    expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);
    expect(beforeCloseSpy).toHaveReceivedEventTimes(0);
    expect(closeSpy).toHaveReceivedEventTimes(0);

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.close(page);
    } else {
      element.setProperty(customizedOptions.openPropName, false);
    }

    await page.waitForChanges();

    await beforeCloseEvent;
    await closeEvent;

    expect(beforeCloseSpy).toHaveReceivedEventTimes(1);
    expect(closeSpy).toHaveReceivedEventTimes(1);
    expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);

    expect(await page.evaluate(() => (window as EventOrderWindow).events)).toEqual(eventSequence);

    async function setUpPage(tag: ComponentTag, page: E2EPage): Promise<void> {
      await page.evaluate(
        (eventSequence: string[], initialToggleValue: boolean, openPropName: string, tag: ComponentTag) => {
          const receivedEvents: string[] = [];

          (window as EventOrderWindow).events = receivedEvents;

          eventSequence.forEach((eventType) => {
            document.addEventListener(eventType, (event) => receivedEvents.push(event.type));
          });

          if (!initialToggleValue) {
            return;
          }

          const component = document.createElement(tag);
          component[openPropName] = true;

          document.body.append(component);
        },
        eventSequence,
        customizedOptions.initialToggleValue,
        customizedOptions.openPropName,
        tag,
      );
    }
  }

  /**
   * `skipAnimations` utility sets the animation duration to 0.01. This is a workaround for an issue with the animation utility.
   * Because this still leaves a very small duration, we can still test the animation events, but faster.
   */

  if (customizedOptions.initialToggleValue === true) {
    it("emits on initialization with animations enabled", async () => {
      const page = await newProgrammaticE2EPage();
      const { tag } = await getTagAndPage(componentTestSetup);
      await skipAnimations(page);
      await testOpenCloseEvents(tag, page);
    });

    it("emits on initialization with animations disabled", async () => {
      const page = await newProgrammaticE2EPage();
      const { tag } = await getTagAndPage(componentTestSetup);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await testOpenCloseEvents(tag, page);
    });
  } else {
    it(`emits with animations enabled`, async () => {
      const { page, tag } = await getTagAndPage(componentTestSetup);
      await skipAnimations(page);
      await testOpenCloseEvents(tag, page);
    });

    it(`emits with animations disabled`, async () => {
      const { page, tag } = await getTagAndPage(componentTestSetup);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await testOpenCloseEvents(tag, page);
    });
  }
}
