/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { E2EElement, E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import type { JSX } from "../components";
import { MessageBundle } from "../utils/t9n";
import { GlobalTestProps, IntrinsicElementsWithProp, newProgrammaticE2EPage, skipAnimations } from "./utils";
import { getTag, simplePageSetup, getTagAndPage, ComponentTestSetup } from "./commonTestUtils/setupForTests";

expect.extend(toHaveNoViolations);

type ComponentTag = keyof JSX.IntrinsicElements;
type ComponentHTML = string;
type TagOrHTML = ComponentTag | ComponentHTML;

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly.
 * At the moment, this only tests if the scroll event listeners are only active when the floating-ui is displayed.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("owns a floating-ui", () => {
 *  floatingUIOwner(
 *    `<calcite-input-date-picker></calcite-input-date-picker>`,
 *      "open",
 *      { shadowSelector: ".menu-container" }
 *  )
 * });
 *
 * @param {TagOrHTML} componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {string} togglePropName - The component property that toggles the floating-ui.
 * @param [options] - additional options for asserting focus
 * @param {string} [options.shadowSelector] - The selector in the shadow DOM for the floating-ui element.
 */
export function floatingUIOwner(
  componentTagOrHTML: TagOrHTML,
  togglePropName: string,
  options?: {
    /**
     * Use this to specify the selector in the shadow DOM for the floating-ui element.
     */
    shadowSelector?: string;
  },
): void {
  it("owns a floating-ui", async () => {
    const page = await simplePageSetup(componentTagOrHTML);

    const scrollablePageSizeInPx = 2400;
    await page.addStyleTag({
      content: `body {
      height: ${scrollablePageSizeInPx}px;
      width: ${scrollablePageSizeInPx}px;
    }`,
    });
    await page.waitForChanges();

    const tag = getTag(componentTagOrHTML);
    const component = await page.find(tag);

    async function getTransform(): Promise<string> {
      // need to get the style attribute from the browser context since the E2E element returns null
      return page.$eval(
        tag,
        (component: HTMLElement, shadowSelector: string): string => {
          const floatingUIEl = shadowSelector
            ? component.shadowRoot.querySelector<HTMLElement>(shadowSelector)
            : component;

          return floatingUIEl.getAttribute("style");
        },
        options?.shadowSelector,
      );
    }

    async function scrollTo(x: number, y: number): Promise<void> {
      await page.evaluate((x: number, y: number) => document.firstElementChild.scrollTo(x, y), x, y);
    }

    component.setProperty(togglePropName, false);
    await page.waitForChanges();

    const initialClosedTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    component.setProperty(togglePropName, true);
    await page.waitForChanges();

    const initialOpenTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).not.toBe(initialOpenTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialOpenTransform);
  });
}

/**
 * Helper to test if a component has a floating-UI-owning component wired up.
 *
 * Note: this performs a shallow test and assumes the underlying component has floating-ui properly configured.
 *
 * @example
 * describe("delegates to floating-ui-owner component", () => {
 *   delegatesToFloatingUiOwningComponent("calcite-pad", "calcite-action-group");
 * });
 *
 * @param componentTagOrHTML
 * @param floatingUiOwnerComponentTag
 */
export async function delegatesToFloatingUiOwningComponent(
  componentTagOrHTML: TagOrHTML,
  floatingUiOwnerComponentTag: ComponentTag,
): Promise<void> {
  it("delegates to floating-ui owning component", async () => {
    const page = await simplePageSetup(componentTagOrHTML);
    const tag = getTag(componentTagOrHTML);

    // we assume if `overlay-positioning` is used by an internal component that it is a floating-ui component

    const floatingUiOwningComponent = await page.find(`${tag} >>> ${floatingUiOwnerComponentTag}`);
    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("absolute");

    const component = await page.find(tag);
    await component.setProperty("overlayPositioning", "fixed");
    await page.waitForChanges();

    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("fixed");
  });
}

/**
 * Helper to test t9n component setup.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("translation support", () => {
 *   t9n("calcite-action");
 * });
 *
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 */

export async function t9n(componentTestSetup: ComponentTestSetup): Promise<void> {
  let component: E2EElement;
  let page: E2EPage;
  let getCurrentMessages: () => Promise<MessageBundle>;

  beforeEach(async () => {
    const { page: e2ePage, tag } = await getTagAndPage(componentTestSetup);
    page = e2ePage;

    type CalciteComponentsWithMessages = IntrinsicElementsWithProp<"messages"> & HTMLElement;

    component = await page.find(tag);
    getCurrentMessages = async (): Promise<MessageBundle> => {
      return page.$eval(tag, (component: CalciteComponentsWithMessages) => component.messages);
    };
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides());
  it("switches messages", async () => await assertLangSwitch());

  async function assertDefaultMessages(): Promise<void> {
    expect(await getCurrentMessages()).toBeDefined();
  }

  async function assertOverrides(): Promise<void> {
    const messages = await getCurrentMessages();
    const firstMessageProp = Object.keys(messages)[0];
    const messageOverride = { [firstMessageProp]: "override test" };

    component.setProperty("messageOverrides", messageOverride);
    await page.waitForChanges();

    expect(await getCurrentMessages()).toEqual({
      ...messages,
      ...messageOverride,
    });

    // reset test changes
    component.setProperty("messageOverrides", undefined);
    await page.waitForChanges();
  }

  async function assertLangSwitch(): Promise<void> {
    const enMessages = await getCurrentMessages();
    const fakeBundleIdentifier = "__fake__";
    await page.evaluate(
      (enMessages, fakeBundleIdentifier) => {
        const orig = window.fetch;
        window.fetch = async function (input, init) {
          if (typeof input === "string" && input.endsWith("messages_es.json")) {
            const fakeEsMessages = {
              ...enMessages, // reuse real message bundle in case component rendering depends on strings

              [fakeBundleIdentifier]: true, // we inject a fake identifier for assertion-purposes
            };
            window.fetch = orig;
            return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
          }

          return orig.call(input, init);
        };
      },
      enMessages,
      fakeBundleIdentifier,
    );

    component.setAttribute("lang", "es");
    await page.waitForChanges();
    await page.waitForTimeout(3000);
    const esMessages = await getCurrentMessages();

    expect(esMessages).toHaveProperty(fakeBundleIdentifier);

    // reset test changes
    component.removeAttribute("lang");
    await page.waitForChanges();
  }
}

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
 *   openClose("calcite-combobox opened with a tab", {
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
 *  openClose("open calcite-combobox closed with a tab", {
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

  async function testOpenCloseEvents(componentTagOrHTML: TagOrHTML, page: E2EPage): Promise<void> {
    const tag = getTag(componentTagOrHTML);
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
  }

  /**
   * `skipAnimations` utility sets the animation duration to 0.01. This is a workaround for an issue with the animation utility.
   * Because this still leaves a very small duration, we can still test the animation events, but faster.
   */

  if (customizedOptions.initialToggleValue === true) {
    it("emits on initialization with animations enabled", async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });

    it("emits on initialization with animations disabled", async () => {
      const page = await newProgrammaticE2EPage();
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });
  } else {
    it(`emits with animations enabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await skipAnimations(page);
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });

    it(`emits with animations disabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });
  }
}
